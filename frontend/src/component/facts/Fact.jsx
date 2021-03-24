import * as React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from '@material-ui/icons/Favorite';
import {endPoints} from "../../constant/endPoints";
import {RestRequest} from "../../service/requestService";
import {AuthContext} from "../AuthProvider";
import {withRouter} from "react-router-dom";
import {Routes} from "../../constant/routes";
import { orange } from "@material-ui/core/colors";

class Fact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {fact: props.fact};
    }

    delete = () => {
        RestRequest.delete(endPoints.deleteFact(this.props.fact['_id'])).then((response) => {
            this.props.deleteOne(this.props.fact);
        }).catch(reason => {
            if (reason.response.status === 401 || reason.response.status === 403) this.props.history.push(Routes.login);
        });
    };

    like = () => {
        if (this.context.currentUser) {
            let factID = this.props.fact['_id'];
            let userID = this.context.currentUser.id;
            RestRequest.put(endPoints.putFact(this.props.fact['_id']), {}, {factID, userID} ).then(response => {
                let fact = this.state.fact;
                fact.likes.length = response.data.payload.likes.length;
                this.setState(fact);
            }).catch(reason => {
                if (reason.response.status === 401 || reason.response.status === 403) this.props.history.push(Routes.login);
            });
        }

    };

    render() {
        return (
            <Box m={1}>
                <Card>
                    <CardHeader title={this.props.fact.title}/>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {this.props.fact.content}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton onClick={this.like} aria-label="Like">
                            <FavoriteIcon/>
                        </IconButton>
                        <Typography>
                            {this.props.fact.likes.length}
                        </Typography>
                        {
                            this.context.currentUser
                                ?
                                <Button onClick={this.delete} variant="outlined" style={{ color: orange[500] }}>
                                    Delete
                                </Button>
                                :
                                <>
                                </>
                        }
                    </CardActions>
                </Card>
            </Box>
        )
    }
}

Fact.contextType = AuthContext;
export default withRouter(Fact);
