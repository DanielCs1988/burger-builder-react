import { connect } from "react-redux";
import Auth from "../../components/Auth/Auth";
import {Credentials} from "../../models";
import {login, register} from "../../store/effects/auth";
import {AppState} from "../../store/types";

const mapStateToProps = ({ auth: { loading, error, idToken }, ingredients: { building } }: AppState) => ({
    building, loading, error, isAuthenticated: idToken !== null
});

const mapDispatchToProps = (dispatch: any) => ({
    onRegister: (credentials: Credentials) => dispatch(register(credentials)),
    onLogin: (credentials: Credentials) => dispatch(login(credentials))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth);