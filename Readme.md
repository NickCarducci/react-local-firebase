# Local-Firebase, your auth-cacher for firebase (in React)!

### https://codesandbox.io/s/react-local-firebase-i7l8qe

LICENSE AGPL-3
No redistribution but for strategy of parts, unless retributed

how to [use](https://hibit.cc)

````
class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: undefined,
      user: undefined,
    };
    this.pa = React.createRef();
    this.gui = React.createRef();
    this.ra = React.createRef();
  }
render() {
    const logoutofapp = () => {
      var answer = window.confirm("Are you sure you want to log out?");
      if (!answer) return null;
      signOut(getAuth())
        .then(async () => {
          console.log("logged out");
          await setPersistence(getAuth(), browserSessionPersistence);
          this.setState({
            user: undefined,
            auth: undefined
          });
          this.ra.current.click();
        })
        .catch((err) => {
          console.log(err);
        });
    };
  return (
        <PromptAuth
          ref={{
            current: {
              pa: this.pa,
              gui: this.gui,
              ra: this.ra
            }
          }}
          //storableAuth={this.state.storableAuth}
          //clearAuth={() => this.setState({ storableAuth: [] })}
          //pa={this.props.pa}
          //gui={this.props.gui}
          onPromptToLogin={() => {}} //this.props.history.push("/login")}
          verbose={true}//https://github.com/remix-run/react-router/issues/8146#issuecomment-1272695437
          onStart={() => window.alert("loading authentication...")}
          windowKey={"meAuth"} //this.state.auth
          setFireAuth={(me, reload, isStored) => {
            if (me && me.constructor === Object) {
              if (isStored) return console.log("isStored: ", me); //all but denied

              if (me.isAnonymous) return console.log("anonymous: ", me);

              if (!me.uid)
                return this.setState({
                  user: undefined,
                  auth: undefined
                });
              //console.log("me", me);
              //this.pa.current.click();
              onSnapshot(
                doc(firestore, "users", me.uid),
                (doc) =>
                  doc.exists() &&
                  this.setState({
                    user: { ...doc.data(), id: doc.id },
                    loaded: true
                  })
              );
              return reload && window.location.reload();
            }
          }}
          onFinish={() => {}}
          meAuth={this.state.auth === undefined ? null : this.state.auth}
        />
        <Sudo
          meAuth={this.state.auth}
          getUserInfo={() => this.gui.current.click()}
          logoutofapp={logoutofapp} //rendered function 
          setAuth={(auth) =>
            this.setState(auth, () => this.pa.current.click())
          }
          //save the rats! Putin pharma cannot compete. made with rationality
          user={this.state.user}
        />
````
Visit [hibit.cc](https://hibit.cc) for linked-boilerplate sandboxes using extricable react-phone-number and firebase-[RecaptchaVerifier,signInWithPhoneNumber] in concerto.

SEE LICENSE IN LICENSE.lz.txt

`copying the src code? https://github.com/npm/cli/issues/3514
npm install --force && npm uninstall @babel/polyfill --save ...`
