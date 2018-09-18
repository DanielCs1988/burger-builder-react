import { connect } from "react-redux";
import {AppState} from "../store/types";
import App from "../components/App";
import {tryAuthenticate} from "../store/effects/auth";

const mapStateToProps = ({ auth: { idToken } }: AppState) => ({
    isAuthenticated: idToken !== null
});

const mapDispatchToProps = (dispatch: any) => ({
    loginIfTokenPresent: () => dispatch(tryAuthenticate())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);