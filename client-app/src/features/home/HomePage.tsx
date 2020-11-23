import React, { useContext, Fragment } from "react";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
import LoginForm from "../user/LoginForm";
import { RegisterForm } from "../user/RegisterForm";

export const HomePage = () => {
  const rootStore = useContext(RootStoreContext);

  const { isLoggedIn, user } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        {isLoggedIn && user ? (
          <Fragment>
            <Header
              as="h2"
              inverted
              content={`Welcome back ${user.displayName}`}
            />
            <Button as={Link} to="/dashboard" size="huge" inverted>
              Go to dashboard
            </Button>
          </Fragment>
        ) : (
          <Fragment>
              <Header as='h1' inverted>Gig Helper</Header>
              <Button
                onClick={() => openModal(<LoginForm />)}
                to="/login"
                size="huge"
                inverted
                style={{ zIndex: "1" }}
              >
                Login
              </Button>
              <Button
                onClick={() => openModal(<RegisterForm />)}
                size="huge"
                inverted
                style={{ zIndex: "1" }}
              >
                Register
              </Button>
          </Fragment>
        )}
      </Container>
    </Segment>
  );
};
