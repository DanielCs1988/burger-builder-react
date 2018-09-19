import { connect } from "react-redux";
import Logout from "../../../components/Auth/Logout/Logout";
import {Actions} from "../../../store/actions/auth";

const mapDispatchToProps = (dispatch: any) => ({
    onLogout: () => dispatch(Actions.initLogout())
});

export default connect(
    null,
    mapDispatchToProps
)(Logout);