import React from "react";
import { session, signIn, signOut, useSession } from "next-auth/client";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Auth from "layouts/Auth.js";

function Login() {
  const [session, loading] = useSession();

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            {!session && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  signIn("credentials", { redirect: false });
                }}
                className="my-4 btn-block"
                color="danger"
                type="button"
              >
                Login
              </Button>
            )}
            {session && (
              <>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                  className="my-4 btn-block"
                  color="success"
                  type="button"
                >
                  Logout
                </Button>
              </>
            )}
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

Login.layout = Auth;

export default Login;
