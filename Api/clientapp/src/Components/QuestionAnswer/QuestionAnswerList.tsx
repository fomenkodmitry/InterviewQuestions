import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {StoreProps} from "../../Type/Props";

export function QuestionAnswerList(props: StoreProps) {
    const useStyles = makeStyles((theme) => ({
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '55.55%',
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
            {props?.questionAnswers?.map(item => (
                <Grid item xs={12} key={item.id}>
                    <Accordion className={classes.accordionItem}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography className={classes.heading}>{item.question}</Typography>
                            <Typography className={classes.secondaryHeading}>Programming
                                language: {props.programmingLanguages?.find(p => p.id == item.programmingLanguageId)?.name}</Typography>
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