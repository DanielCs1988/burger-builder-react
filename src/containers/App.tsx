import { connect } from "react-redux";
import {AppState} from "../store/types";
import App from "../components/App";
import {Actions} from "../store/actions/auth";

const mapStateToProps = ({ auth: { idToken } }: AppState) => ({
    isAuthenticated: idToken !== null
});

const mapDispatchToProps = (dispatch: any) => ({
    loginIfTokenPresent: () => dispatch(Actions.initTryAuthenticate())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);