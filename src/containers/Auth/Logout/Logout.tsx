import { connect } from "react-redux";
import Logout from "../../../components/Auth/Logout/Logout";
import {logout} from "../../../store/effects/auth";

const mapDispatchToProps = (dispatch: any) => ({
    onLogout: () => dispatch(logout())
});

export default connect(
    null,
    mapDispatchToProps
)(Logout);