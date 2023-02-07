import React from "react";
import PouchDB from "pouchdb";
import upsert from "pouchdb-upsert";
//import firebase from "firebase/app";
import { onAuthStateChanged, getAuth, signInAnonymously } from "firebase/auth"; //precedence is musket to face //geohash spoof democracy
//import "firebase/firestore";
const standardCatch = (err) =>
  console.log("REACT-LOCAL-FIREBASE: ", err.message);

const optsForPouchDB = {
  revs_limit: 1, //revision-history
  auto_compaction: true //zipped...
}; //const deletion = (d, db) => db.remove(d).catch(standardCatch);
//layoffs will make deflation,
//better products will get ayoffs (technologsts do t seek m0ore problems)
//i'll take a mudpie to a non deflationary job and I will have ONE apple pie.
//A RECESSION IS A fall of shrinkflation, benefits from essential institutions, and layoffs
//if the economy settled would be property, what is the dollar vs bond
//machine rent is how capital wedges labor
class ADB {
  constructor(verbose) {
    PouchDB.plugin(upsert);
    const title = "meAuth";
    this.verbose = verbose;
    this.db = new PouchDB(title, optsForPouchDB);
  } //layoffs will make deflation, ill
  destroy = () =>
    this.db
      .destroy()
      .then(() => {
        this.verbose && console.log("destroy");
        PouchDB.plugin(upsert);
        const title = "meAuth";
        this.db = new PouchDB(title, optsForPouchDB);
      })
      .catch(standardCatch); //conservative margins: layoffs, uniformity, more
  store = async (bloc) => {
    this.verbose && console.log("store", bloc);
    const sbloc = JSON.stringify(bloc);
    if (!bloc._id)
      return window.alert("pouchdb needs ._id key:value: JSON.parse= " + sbloc); //has upsert plugin from class constructor
    return await new Promise((resolve) => {
      const m = JSON.parse(sbloc); //https://github.com/pouchdb/pouchdb/issues/6411
      this.db.upsert(m._id, (t) => {
        t = { ...m };
        return t;
      }); //pouch-db \(construct, protocol)\ //upsert polyfill has no promise returned (...then)
      resolve(JSON.stringify(m));
    }).catch(standardCatch); //return a copy, don't displace immutable object fields
  };
  remove = async (key) => {
    /*if (!key._id)
      window.alert(
        "pouchdb needs ._id key:value: JSON.parse= " + JSON.parse(key)
      ) && this.destroy();*/
    this.verbose && console.log("removing auth", key);
    return await this.db
      .get(key)
      //.then(async (r) => await JSON.parse(r))
      .then(async (key) => {
        //this.verbose &&
        console.log("removed", key);
        return await this.db.remove(key).catch((e) => this.destroy());
      })
      .catch(standardCatch);
  }; //has upsert plugin from class constructor
  readAuth = async (notes = {}) => {
    return await this.db /*read*/
      .allDocs({ include_docs: true })
      .then(async (allNotes) => {
        const p = (n) => (notes[n.doc.key] = n.doc.proactiveRefresh);
        const a = async (v) =>
          await new Promise((r) => {
            const pv = p(v);
            this.verbose && console.log(pv); //need aquarian
            r(JSON.stringify(pv));
          });
        return await Promise.all(allNotes.rows.map(a));
      })
      .catch((e) => this.destroy()); //new Promise cannot handle JSON objects, Promise.all() doesn't
  }; // && and .then() are functionally the same;
}

class PromptAuth extends React.Component {
  constructor(props) {
    super(props);
    const adb = new ADB(props.verbose);
    this.state = {
      adb
    };
  }
  componentDidMount = () => {
    this.state.adb
      .readAuth()
      //.then(async (r) => await JSON.parse(r[0]))
      .then((r) => r[0])
      .then(async (r) => {
        //console.log(r);
        if (!r) return await JSON.parse("{}");
        if (r.constructor === Array) return r;
        if (r) return await JSON.parse(r);
      })
      .then((read) => {
        //console.log(read);
        if (read.constructor === Array) return null; //console.log(k, k.proactiveRefresh.user); //when anonymous, too
        //const read = JSON.parse(r[0]); //if (k.proactiveRefresh) this.state.adb["remove"](k.uid)  hydrateUser({})
        /*this.setState({ authe: read.user }, () => {
          //console.log(this.state.authe);
          this.props.hydrateUser(
            Object.keys(this.state.authe).reduce((copy, key) => {
              console.log(copy);
              return this.state.authe[key];
            })
          );
        });*/

        //const read = r ? k.proactiveRefresh.user : {};

        this.props.hydrateUser((window[this.props.windowKey] = read.user)); //bottle
        //console.log(window[this.props.windowKey]);
        //storedAuth.multiFactor = JSON.parse(storedAuth.multiFactor);
        this.props.verbose &&
          console.log(
            `REACT-LOCAL-FIREBASE(pouchdb): ${
              !read
                ? "no user stored..."
                : read.user.isAnonymous
                ? "authdb is anonymous"
                : //: read._id !== "none"?
                  "is identifiable"
            }` + (read ? `: ` : ""),
            read.user
          ); // + Object.keys(read.user).filter((x) => read[x])
      })
      .catch((err) => console.log(err));
  };
  render() {
    var { verbose, hydrateUser, meAuth } = this.props; //strict promise //return await new Promise((resolve) =>
    const removeanon = () =>
      meAuth &&
      meAuth !== undefined &&
      meAuth.constructor === Object &&
      meAuth.isAnonymous && //meAuth.delete() //firebase 8
      getAuth()
        .deleteUser(meAuth.uid)
        .then(() => {
          window.alert(
            "REACT-LOCAL-FIREBASE: successfully removed anonymous account"
          );
          verbose &&
            console.log(
              "REACT-LOCAL-FIREBASE: " + meAuth.uid + " is logged in"
            );
          this.props.onFinish(); // resolve(meAuth.isAnonymous); if (res)
        })
        .catch(standardCatch); //res.isAnonymous
    const store = (obj) => {
      this.state.adb["store"]({
        ...obj,
        _id: obj.uid
      })
        .then(async (r) => await JSON.parse(r))
        .then((res) => Object.keys(obj).length > 1 && hydrateUser(res)) //reload,"isStored"
        .catch(standardCatch); //when anonymous, too
    };
    const hoistAuth = (User, force) => {
      //return {  local: (reload, auts) => {
      const err = !User || Object.keys(User).length === 0;
      err && hydrateUser({}); //const a = /* err ? { _id: "none" } : */ User; /*meAuth ? meAuth :*/ //auts; //mea
      var permission = null;
      console.log("User: ", User);
      if (User) {
        if (!User.isAnonymous && !force)
          permission = window.confirm(
            (!this.props.meAuth ? "is this a private device? if so, " : "") +
              "can we store your auth data?" +
              `(${User.displayName},${User.phoneNumber},${User.email})` //mea
          );
        if (!permission) {
          if (meAuth) {
            const { displayName, phoneNumber, email } = meAuth;
            window.confirm(
              "should we clear the following from your device? " +
                `(${displayName},${phoneNumber},${email})` //mea
            ) && store({ _id: meAuth.uid });
          }
          hydrateUser(User); //var meAuthstripped = stringAuthObj(mea);console.log(meAuthstripped);
          verbose &&
            console.log("REACT-LOCAL-FIREBASE(ephemeral): " + User.uid); //+ meAuthstripped.isAnonymous ? "" : "?"
        } else {
          verbose &&
            console.log(
              "REACT-LOCAL-FIREBASE(storing): " + User.uid + " found"
            );
          store({ ...User, _id: User.uid });
        }
      }
    };
    const init = () =>
      this.setState(
        {
          authStateListening: true
        },
        () => {
          onAuthStateChanged(
            getAuth(),
            async (aut) => {
              verbose &&
                console.log(
                  "REACT-LOCAL-FIREBASE(addAuthStateListener): ",
                  aut
                );
              if (!aut) {
                var answer = window.confirm("login?");
                if (answer) return this.props.onPromptToLogin();
                await signInAnonymously(getAuth());
                return (
                  verbose &&
                  console.log(
                    "REACT-LOCAL-FIREBASE(anonymousSignIn): getting fake user data..."
                  )
                );
              }
              console.log("hoist", aut);
              hoistAuth(aut); //when anonymous, too
            },
            standardCatch
          );
        }
      );
    //console.log(this.state.authe);
    return (
      <div style={this.props.style}>
        <div
          ref={this.props.pa} //promptAuth
          onClick={() => {
            console.log("REACT-LOCAL-FIREBASE(questionaire): ", meAuth);
            if (!this.state.authStateListening) return init();
            hoistAuth(meAuth);
          }} //,null,true); //this.props.clearStore();
        />
        <div
          ref={this.props.gui} //getUserInfo
          onClick={async () => {
            this.props.onStart();
            if (!this.state.authStateListening) return init();
            //if (!meAuth) return init(); // (meAuth.constructor === Object && Object.keys(meAuth).length < 1)

            if (meAuth.isAnonymous) {
              console.log(meAuth.uid + " is anonymous"); //hoistAuth(s, false, true);
              return this.props.onPromptToLogin();
            } //return await new Promise((resolve) => resolve("login?"));
            //if (s !== undefined) !s.multiFactor && this.state.adb.deleteKeys(); meAuth.multiFactor = JSON.parse(s.multiFactor);
            // this.props.hydrateUser(meAuth);
            verbose &&
              console.log(
                `REACT-LOCAL-FIREBASE: ${
                  meAuth.uid + " is stored, saving on costs here"
                }`
              ); //!meAuth.multiFactor ? meAuth.uid + " is substandard; !meAuth1.multiFactor, deleting these from pouchdb.."
            removeanon(); //: //strAu.uid + ": JSON.parse-ing 'meAuth1.multiFactor' object..":
          }}
        />
        <div
          ref={this.props.ra} //resetAuth
          onClick={() => {
            //this.props.onStart();
            if (!meAuth.uid)
              return console.log(
                "(react-local-firebase): no loaded meAuth",
                meAuth
              ); //hoistAuth({}, true, true); //payload, reload, all-but-denied permission
            this.state.adb["remove"](meAuth.uid) //_id
              .then(async (res) => {
                await meAuth.reload(); //signOut reset or remove recall
                window[this.props.windowKey] = await getAuth().currentUser();
                if (!window[this.props.windowKey]) return hydrateUser({});
                store(window[this.props.windowKey]);
              }) //, true, "isStored"))
              .catch(standardCatch); //when anonymous, too  //if (res) this.props.onFinish(); //res.isAnonymous
          }}
        />
      </div>
    );
  }
}
export default React.forwardRef((props, ref) => {
  return (
    <PromptAuth
      gui={ref.current["gui"]}
      pa={ref.current["pa"]}
      ra={ref.current["ra"]}
      {...props}
    />
  );
});
