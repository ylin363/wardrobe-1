import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons'; //Should be User's current avatar
import { Avatar } from 'antd';
import { message } from 'antd';
import firebase from '../firebase';

const Wrapper = styled.div`
  width: 50%;
  margin-left: auto;
  margin-right: auto;
`;

const Card1 = styled.div`
  background-color: #ffffff;
  box-shadow: 3px 3px 8px 0.5px #444444;
  margin: 30px auto;
  width: 90%;
  h2 {
    text-align: center;
    font-weight: bold;
    padding: 2rem 2rem;
  }
  hr {
    color: #e2e1e1;
  }
`;

const Card1Content = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 2rem;
  .emailForm input {
    border-radius: 4px;
    background-color: #ecf0f7;
    border: 1px solid #c3c4c8;
    width: 34.5%;
    margin-bottom: 20px;
    margin-right: 3%;
  }

  .passwordForm input {
    border-radius: 4px;
    background-color: #ecf0f7;
    border: 1px solid #c3c4c8;
    width: 22%;
    margin-bottom: 20px;
    margin-right: 3%;
  }

  .saveEmailButton {
    width: 10%;
    background: #6247ce;
    &:hover {
      color: #fff;
      background-color: #6247ce;
    }
  }

  .savePasswordButton {
    width: 10%;
    background: #6247ce;
    &:hover {
      color: #fff;
      background-color: #6247ce;
    }
  }
`;

const Card2 = styled.div`
  background-color: #d1c7ff;
  box-shadow: 3px 3px 8px 0.5px #444444;
  margin: 30px auto;
  width: 90%;
  hr {
    width: 90%;
    color: #948eab;
  }
  h2 {
    text-align: center;
    font-weight: bold;
    padding: 2rem 2rem;
  }
  .card2Content {
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 2rem;
    width: 90%;

    input {
      border-radius: 4px;
      background-color: #ecf0f7;
      border: 1px solid #c3c4c8;
      margin-bottom: 20px;
      margin-right: 3%;
    }

    .deleteAccountButton {
      background: #6247ce;
      &:hover {
        color: #fff;
        background-color: #6247ce;
      }
    }
  }
`;

const StyledAvatar = styled(Avatar)`
  cursor: pointer;
  margin-bottom: 20px;
`;

export default class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newemail: '',
      newpassword: '',
      verifynewpassword: '',
      currentpassword1: '',
      currentpassword2: '',
      currentpassword3: '',
    };
  }

  onChangeEmail = () => {
    let user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      this.state.currentpassword1
    );
    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        user.updateEmail(this.state.newemail);
        message.success('Email updated successfully!');
      })
      .catch(error => {
        // Handle Errors here.
        message.error(error.message);
      });
  };

  onChangePassword = () => {
    if (this.state.newpassword !== this.state.verifynewpassword) {
      message.error('Your new password and new password verification do not match.');
    } else {
      let user = firebase.auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        this.state.currentpassword2
      );
      user
        .reauthenticateWithCredential(credential)
        .then(() => {
          user.updatePassword(this.state.newpassword);
          message.success('Password updated successfully!');
        })
        .catch(error => {
          // Handle Errors here.
          message.error(error.message);
        });
    }
  };

  onDeleteAccount = () => {
    //Nothing yet - should remove all traces of user from auth, firestore, and storage
  };

  handleNewEmailChange = event => {
    this.setState({ newemail: event.target.value });
  };
  handleNewPasswordChange = event => {
    this.setState({ newpassword: event.target.value });
  };
  handleVerifyNewPasswordChange = event => {
    this.setState({ verifynewpassword: event.target.value });
  };
  handleCurrentPassword1Change = event => {
    this.setState({ currentpassword1: event.target.value });
  };
  handleCurrentPassword2Change = event => {
    this.setState({ currentpassword2: event.target.value });
  };
  handleCurrentPassword3Change = event => {
    this.setState({ currentpassword3: event.target.value });
  };

  render() {
    return (
      <Wrapper>
        <Card1>
          <h2>Account Settings</h2>
          <Card1Content>
            <hr></hr>
            <label>Avatar</label>
            <br></br>
            <StyledAvatar size="large" icon={<UserOutlined />} />
            <hr></hr>
            <form className="emailForm">
              <label>Change Email</label>
              <br />
              <input
                type="text"
                id="email"
                name="email"
                placeholder="New Email"
                onChange={this.handleNewEmailChange}
              />
              <input
                type="password"
                id="currentpassword1"
                name="currentpassword1"
                placeholder="Current Password"
                onChange={this.handleCurrentPassword1Change}
              />
              <Button
                className="saveEmailButton"
                component={Link}
                type="primary"
                variant="contained"
                color="primary"
                onClick={this.onChangeEmail}
              >
                SAVE
              </Button>
            </form>
            <hr></hr>
            <form className="passwordForm">
              <label>Change Password</label>
              <br />
              <input
                type="password"
                id="newpassword"
                name="newpassword"
                placeholder="New Password"
                onChange={this.handleNewPasswordChange}
              />
              <input
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                placeholder="Confirm New Password"
                onChange={this.handleVerifyNewPasswordChange}
              />
              <input
                type="password"
                id="currentpassword2"
                name="currentpassword2"
                placeholder="Current Password"
                onChange={this.handleCurrentPassword2Change}
              />
              <Button
                className="savePasswordButton"
                component={Link}
                type="primary"
                variant="contained"
                color="primary"
                onClick={this.onChangePassword}
              >
                SAVE
              </Button>
            </form>
          </Card1Content>
        </Card1>
        <Card2>
          <h2>Delete Account</h2>
          <hr></hr>
          <div className="card2Content">
            <p>Once you delete, it will clear all of your data.</p>
            <p>Are you sure you want to delete your account?</p>
            <form id="deleteAccountForm">
              <input
                type="password"
                id="currentpassword3"
                name="currentpassword3"
                placeholder="Current Password"
                onChange={this.handleCurrentPassword3Change}
              />
              <Button
                className="deleteAccountButton"
                component={Link}
                type="primary"
                variant="contained"
                color="primary"
                onClick={this.onDeleteAccount}
              >
                DELETE MY ACCOUNT
              </Button>
            </form>
          </div>
        </Card2>
      </Wrapper>
    );
  }
}
