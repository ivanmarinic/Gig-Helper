import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { render } from "@testing-library/react";
import { Icon, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

interface IProps {
  fbCallback: (response: any) => void;
  loading: boolean;
}

const SocialLogin: React.FC<IProps> = ({ fbCallback, loading }) => {
  return (
    <div>
      <FacebookLogin
        appId="2741325699473788"
        fields="name,email"
        callback={fbCallback}
        render={(renderProps: any) => (
          <Button
            loading={loading}
            onClick={renderProps.onClick}
            type="button"
            fluid
            color="facebook"
          >
            <Icon name="facebook" />
            Login with Facebook
          </Button>
        )}
      />
    </div>
  );
};

export default observer(SocialLogin);
