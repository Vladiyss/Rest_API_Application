import * as React from "react";
import Fact from "./Fact";
import {endPoints} from "../../constant/endPoints";
import Container from "@material-ui/core/Container";
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import {RestRequest} from "../../service/requestService";
import {Routes} from "../../constant/routes";
import {withRouter} from "react-router-dom";


class FactsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {facts: [], loading: false, order: true};
    }

    deleteOneFact = (element) => {
        let facts = this.state.facts;
        let updatedFacts = facts.filter((fact) => !(fact['_id'] === element['_id']));
        this.setState({facts: updatedFacts});
    };

    componentDidMount() {
        this.load(this.state.order);
    }

    load = (order) => {
        this.setState({loading: true});
        RestRequest.get(endPoints.getFactsList + `?sort=likes&order=${order ? 1 : -1}`)
            .then((response) => {
                const facts = response.data.payload;
                this.setState({loading: false, facts, order});
            }).catch(reason => {
            if (reason.response.status === 401 || reason.response.status === 403) this.props.history.push(Routes.login);
        });
    };
    
    topLike = () => {
        this.load(false);
    };

    render() {
        let loading = this.state.loading;
        let facts = this.state.facts.map((fact) => {
            return <Fact deleteOne={this.deleteOneFact} key={fact['_id']} fact={fact}/>
        });
        return (
            <React.Fragment>
                <Container maxWidth="sm">
                    <IconButton onClick={this.topLike}>
                        {this.state.order ? <FavoriteBorderIcon/> : <FavoriteIcon/>}
                    </IconButton>
                    <Box>
                        <Container>
                            {loading ? <LinearProgress variant="determinate"/> : facts}
                        </Container>
                    </Box>
                </Container>
            </React.Fragment>)
    }

}

export default withRouter(FactsList)
