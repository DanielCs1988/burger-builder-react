import { connect } from "react-redux";
import {AppState} from "../store/types";
import App from "../components/App";

const mapStateToProps = ({ auth: { idToken } }: AppState) => ({
    isAuthenticated: idToken !== null
});

const mapDispatchToProps = (dispatch: any) => ({
    loginIfTokenPresent: () => dispatch()
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);