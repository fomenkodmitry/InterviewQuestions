import {TQuestionAnswerTypeList} from "./QuestionAnswer";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import { sizing } from '@material-ui/system';

interface QuestionAnswerListProps {
    items: TQuestionAnswerTypeList
}

export function QuestionAnswerList(props : QuestionAnswerListProps) {
    const useStyles = makeStyles((theme) => ({
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '66.66%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
        accordionItem: {
            marginTop: '20px',
        },
        ulElement: {
            minWidth: '100%',
        }
    }));
    const classes = useStyles();
    return (
        <ul className={classes.ulElement}>
            {props.items.map(item => (
                <Grid item xs={12}>
                    <Accordion className={classes.accordionItem} >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>{item.question}</Typography>
                            <Typography className={classes.secondaryHeading}>Tags: NET</Typography>
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