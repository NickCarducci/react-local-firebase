# Local-Firebase, your auth-cacher for firebase (in React)!

### 

LICENSE AGPL-3
No redistribution but for strategy of parts, unless retributed

how to use
    
    class Auth extends React.Component {
      constructor(props) {
        super(props);
        var storedAuth = undefined;
        this.state = {
          auth: undefined,
          user: undefined,
          meAuth: {},
          storedAuth,
          storableAuth: []
        };
        this.pa = React.createRef();
        this.fwd = React.createRef();
        this.Vintages = React.createRef();
      }
    render() {
      return (
        <div>
          <PromptAuth
            getRefs={() => {
              return {
                pa: this.pa,
                fwd: this.fwd
              };
            }}
            reset={this.state.resetAuth}
            storableAuth={this.state.storableAuth}
            clearAuth={() => this.setState({ storableAuth: [] })}
            resetResetAuth={() => this.setState({ resetAuth: null })}
            //pa={this.pa}
            //fwd={this.fwd}
            onPromptToLogin={() => this.props.history.push("/login")}
            verbose={true}
            onStart={() => this.props.loadGreenBlue("loading authentication...")}
            setFireAuth={(answer) => {
              if (Object.keys(answer).includes("isStored")) {
                console.log("isStored");
                answer.logout && window.location.reload();
              } else if (Object.keys(answer).includes("meAuth"))
                this.setState(
                  {
                    meAuth: answer.meAuth
                  },
                  () => {
                    if (answer.meAuth.isAnonymous) console.log("anonymous");
                    !answer.meAuth.isAnonymous &&
                      firebase
                        .firestore()
                        .collection("users")
                        .doc(answer.meAuth.uid)
                        .onSnapshot((doc) => {
                          this.props.unloadGreenBlue();
                          if (doc.exists) {
                            var user = doc.data();
                            user.id = doc.id;
                            //console.log(user);
                            //console.log(answer.meAuth);
                            this.setState(
                              {
                                user,
                                auth: answer.meAuth,
                                loaded: true
                              },
                              () => this.addUserDatas(answer.meAuth, user)
                            );
                          }
                        }, standardCatch);
                  }
                );
            }}
            onFinish={() => this.props.unloadGreenBlue()}
            meAuth={this.state.meAuth === undefined ? null : this.state.meAuth}
            auth={this.state.auth === undefined ? null : this.state.auth}
          />

          <Data
            meAuth={this.state.meAuth}
            getUserInfo={
              () => this.fwd.current.click()
              //this.getUserInfo()}
            } //
            saveAuth={(x, hasPermission) => {
              this.setState(
                { storableAuth: [x, true, hasPermission] },
                () => {}
                // setTimeout(() => this.pa.current.click(), 200)
              );
            }}
            logoutofapp={async () => {
              var answer = window.confirm("Are you sure you want to log out?");
              if (answer) {
                await firebase
                  .auth()
                  .setPersistence(firebase.auth.Auth.Persistence.SESSION);
                firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    console.log("logged out");
                    this.pa.current.click({}, true);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                this.setState({ resetAuth: true }, () =>
                  this.fwd.current.click()
                );
                // this.getUserInfo();
              }
            }}

SEE LICENSE IN LICENSE.lz.txt

copying the src code? https://github.com/npm/cli/issues/3514
npm install --force && npm uninstall @babel/polyfill --save ...