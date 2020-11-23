import React, { Fragment, useContext, useEffect } from "react";
import { Segment, Header, Form, Button, Comment } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { observer } from "mobx-react-lite";
import { TextAreaInput } from "../../app/common/form/TextAreaInput";
import { RootStoreContext } from "../../app/stores/rootStore";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";

const Chat = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    createHubConnection,
    stopHubConnection,
    addComment,
    comments,
  } = rootStore.commentStore;

  const { user } = rootStore.userStore;

  useEffect(() => {
    createHubConnection();
    return () => {
      stopHubConnection();
    };
  }, [createHubConnection, stopHubConnection]);

  return (
    <Fragment>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none"}}
      >
        <Header>Chat</Header>
      </Segment>
      <Segment attached >
        <Comment.Group>
          {comments?.map(
            (comment, i) => (
              console.log(comment),
              (
                <Comment key={comment?.id}>
                  <Comment.Avatar src={user!.image || "/assets/user.png"} />
                  <Comment.Content>
                    <Comment.Author
                      as={Link}
                      to={`/profile/${comment?.username}`}
                    >
                      {comment?.displayName}
                    </Comment.Author>
                    <Comment.Metadata>
                    </Comment.Metadata>
                    <Comment.Text>{comment?.body}</Comment.Text>
                  </Comment.Content>
                </Comment>
              )
            )
          )}
          <FinalForm
            onSubmit={addComment}
            render={({ handleSubmit, submitting, form }) => (
              <Form onSubmit={() => handleSubmit()!.then(() => form.reset())}>
                <Field
                  name="body"
                  component={TextAreaInput}
                  rows={2}
                  placeholder="Chat with others"
                />
                <Button
                  loading={submitting}
                  content="Add Reply"
                  labelPosition="left"
                  icon="edit"
                  primary
                />
              </Form>
            )}
          />
        </Comment.Group>
      </Segment>
    </Fragment>
  );
};

export default observer(Chat);
