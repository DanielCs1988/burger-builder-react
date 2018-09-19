import { connect } from "react-redux";
import Auth from "../../components/Auth/Auth";
import {Credentials} from "../../models";
import {AppState} from "../../store/types";
import {Actions} from "../../store/actions/auth";

const mapStateToProps = ({ auth: { loading, error, idToken }, ingredients: { building } }: AppState) => ({
    building, loading, error, isAuthenticated: idToken !== null
});

const mapDispatchToProps = (dispatch: any) => ({
    onRegister: (credentials: Credentials) => dispatch(
        Actions.initAuthenticate({ isLogin: false, credentials })
    ),
    onLogin: (credentials: Credentials) => dispatch(
        Actions.initAuthenticate({ isLogin: true, credentials })
    )
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth);