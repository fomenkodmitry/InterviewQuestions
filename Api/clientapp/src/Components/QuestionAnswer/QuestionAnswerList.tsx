import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {StoreProps} from "../../Type/Props";
import InfiniteScroll from "react-infinite-scroll-component";
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import {useAppDispatch} from "../../Store/Store";
import {QuestionFilterType} from "../../Type/QuestionAnswerType";
import {fetchQuestionAnswerThunk} from "../../Thunk/QuestionAnswerThunk";
import {questionAnswerClearState} from "../../Action/QuestionAnswerAction";

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '85.55%',
        flexShrink: 0,
        [theme.breakpoints.up('sm')]: {
            flexBasis: '75.55%',
        },
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    textHidden: {
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    accordionItem: {
        marginTop: '20px',
    },
    gridItem: {
        marginTop: '20px',
    },
    ulElement: {
        minWidth: '100%',
    }
}));

function QuestionAnswerList(props?: StoreProps) {

    const dispatch = useAppDispatch()

    const getQuestions = (filter?: QuestionFilterType) => {
        dispatch(fetchQuestionAnswerThunk(filter))
    };

    //заполняем стор первичными данными с помощью хука
    useEffect(() => {
        dispatch(questionAnswerClearState())
        getQuestions()
    }, []);


    const classes = useStyles();

    const fetchMoreData = () => {
        let pageNumber = 1;
        if (props?.questionAnswers?.paging?.currentPage) {
            pageNumber = props.questionAnswers.paging.currentPage + 1
        }
        const filter: QuestionFilterType = {
            searchText: props?.values?.searchText,
            tagIds: props?.values?.tagIds,
            paging: {
                pageNumber: pageNumber,
                pageSize: 20
            }
        }
        getQuestions(filter)
    };

    return (
        <ul className={classes.ulElement}>
            <InfiniteScroll
                dataLength={props?.questionAnswers?.items?.length ? props?.questionAnswers?.items?.length : 0}
                next={fetchMoreData}
                hasMore={((props?.questionAnswers?.paging?.currentPage ?? 0) < (props?.questionAnswers?.paging?.pagesCount ?? 0))}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {props?.questionAnswers?.items.map(item => (
                    <Grid item xs={12} key={item.id} className={classes.gridItem}>
                        <Accordion className={classes.accordionItem}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                <Typography className={classes.heading}>{item.question}</Typography>
                                <Typography className={classes.secondaryHeading}>
                                    <span
                                        className={classes.textHidden}>Tags:</span> {item.tagIds.map((id) => (props?.tags?.find(p => p?.id == id)?.name?.concat(" ")))}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{item.answer.replace('\n', '<br/>')}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                ))}
            </InfiniteScroll>
        </ul>
    );
}


//можно получать уже готовые стейты
const mapStateToProps = (state: StoreProps) => ({
    tags: state.tags,
    questionAnswers: state.questionAnswers
})

// подключение компонента к стору
export default connect(mapStateToProps)(QuestionAnswerList)