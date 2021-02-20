import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {StoreProps} from "../../Type/Props";

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
    textHidden : {
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

export function QuestionAnswerList(props: StoreProps) {
    const classes = useStyles();

    return (
        <ul className={classes.ulElement}>
            {props?.questionAnswers?.map(item => (
                <Grid item xs={12} key={item.id} className={classes.gridItem}>
                    <Accordion className={classes.accordionItem}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography className={classes.heading}>{item.question}</Typography>
                            <Typography className={classes.secondaryHeading}>
                                <span className={classes.textHidden}>Language:</span> {props.programmingLanguages?.find(p => p.id == item.programmingLanguageId)?.name}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{item.answer}</Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            ))}
        </ul>
    );
}