const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const ip = require("ip");

//my modules
const client = require("./modules/synapseInit");
let port = process.env.PORT || 3001;

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static(path.join(__dirname, "../build")));

app.post("/create-user", jsonParser, (req, res) => {
  //more information: https://github.com/SynapseFI/SynapseNode/blob/master/samples.md#create-user
  client
    .createUser(req.body)
    .then(response => {
      console.log(response);
      res.send(response);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});

const getUser = userId => {
  //more information: https://docs.synapsefi.com/docs/create-a-user-1
  // const userId = "5d5f3d23472e253586bbfe6f";
  const options = {
    full_dehydrate: true
  };
  return new Promise((resolve, reject) => {
    client
      .getUser(userId, options)
      .then(response => {
        console.log(response);
        resolve(response);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

app.post("/get-user", jsonParser, (req, res) => {
  getUser(req.body.userId)
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      res.send(err);
    });
});

app.post("/auth-user", jsonParser, (req, res) => {
  getUser(req.body.userId)
    ._oauthUser(req.body.refreshToken)
    .then(response => {
      console.log(response);
      res.send(response);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});

app.get("/institutions-list", (req, res) => {
  client
    .getInstitutions()
    .then(response => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});

app.post("/bank-credentials", jsonParser, (req, res) => {
  getUser(req.body.userId)
    .then(response => {
      return response.createNode(req.body.bankCredentials);
    })
    .then(response => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});

app.post("/verify-mfa", jsonParser, (req, res) => {
  // const accessToken = "fake_cd60680b9addc013ca7fb25b2b704ba82d3";
  // const mfaAnswer = "test_answer";

  getUser(req.body.userId)
    .then(response => {
      return response.verifyAchMfa(req.body.accessToken, req.body.mfaAnswer);
    })
    .then(response => {
      console.log(response);
      res.send(response);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});

app.post("/create-transaction", jsonParser, (req, res) => {
  // const fromNodeID = bank.nodes[0]._id;
  // const body = {
  //   to: {
  //     type: "ACH-US",
  //     id: bank.nodes[1]._id
  //   },
  //   amount: {
  //     amount: 120.41,
  //     currency: "USD"
  //   },
  //   extra: {
  //     ip: ip.address()
  //   }
  // };

  getUser(req.body.userId)
    .then(response => {
      return response.createTransaction(req.body.accountId, {
        ...req.body.transaction,
        extra: {
          ip: ip.address()
        }
      });
    })
    .then(response => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});

app.post("/view-account", jsonParser, (req, res) => {
  getUser(req.body.userId)
    .then(response => {
      return response.getNode(req.body.accountId);
    })
    .then(response => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});

app.post("/update-user", jsonParser, (req, res) => {
  getUser(req.body.userId)
    .then(response => {
      return response.updateUser(req.body.updatedData);
    })
    .then(response => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});

app.post("/all-users", jsonParser, (req, res) => {
  console.log(req.body);

  client
    .getAllUsers(req.body)
    .then(response => {
      console.log(response.data.users);
      let newArr = response.data.users.map(user => {
        return { userId: user._id, name: user.legal_names[0] };
      });
      res.send(newArr);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});

app.listen(port, () =>
  console.log(`Express server is running on localhost:${port}`)
);
