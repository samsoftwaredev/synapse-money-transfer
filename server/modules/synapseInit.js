const Synapse = require("synapsenode");
const ip = require("ip");
const Client = Synapse.Client;

const args = {
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  fingerprint: process.env.FINGERPRINT,
  ip_address: ip.address(),
  // isProduction determines if production (true) or sandbox (false) endpoint is used
  isProduction: false
};

const client = new Client(args);
module.exports = client;
