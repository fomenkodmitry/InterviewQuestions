import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Button, Card, CardActions, CardContent, CardMedia, Container, Grid} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '66.66%',
        flexShrink: 0,
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

export function QuestionAnswer() {
    const classes = useStyles();
    const cards = [1,2,3,4,5]
    return (
        <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={2}>
                {cards.map((card) => (
                    <Grid item key={card} xs={12} sm={12} md={12}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography className={classes.heading}>General settins</Typography>
                                <Typography className={classes.secondaryHeading}>Tags: NET</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                                    maximus est, id dignissim quam.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}