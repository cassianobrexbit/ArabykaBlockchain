const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express();

const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('../../test-application/javascript/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('../../test-application/javascript/AppUtil.js');

const channelName = 'mychannel';
const chaincodeName = 'basic';
const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'appUser';

var options = {
    // customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Agropacking Blockchain API",
    // customfavIcon: "/assets/favicon.ico"
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.use(express.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

// BATCH ROUTES

// Posting a new batch
app.post("/batch",  async (req, res) => {

    const { id, identification, fabrication_date, expiration_date, product_reference } = req.body;
    
    try {

        const result = await contract.submitTransaction('CreateBatch', id, identification, fabrication_date, expiration_date, product_reference);

        console.log(result);

        if (`${result}` !== '') {
            res.status(201).json({

                message: "Ok",

            });
        }

    } catch (error) {
        res.status(400).json({

            message: "Erro",

        });
    }

});

// Getting a specific batch
app.get("/batch/:id", async (req, res) => {

    let { id } = req.params;

    try {

        const result = await contract.evaluateTransaction('ReadBatch', id);

        console.log(result);

        if (`${result}` !== '') {
            res.status(201).json({

                message: result,

            });
        }

    } catch (error) {
        res.status(400).json({

            message: "Erro",

        });
    }
});

// Posting a new barcode for a specific batch
app.post("/batch/:id/barcode", async (req, res) => {

    let { id } = req.params;

    const { quantity } = req.body;

    console.log(id);

    res.status(201).json({
        message: id,
    });
});

// BATCH EVENTS

app.post("/batch-event", async (req, res) => {

    const { id, batch, batch_event_type } = req.body;

    try {

        const result = await contract.submitTransaction('CreateBatchEvent', id, batch, batch_event_type);

        console.log(result);

        if (`${result}` !== '') {
            res.status(201).json({

                message: "Ok",

            });
        }

    } catch (error) {
        res.status(400).json({

            message: "Erro",

        });
    }
});

// Getting a specific batch
app.get("/batch-event/:id", async (req, res) => {

    const { id } = req.params;

    try {

        const result = await contract.evaluateTransaction('ReadBatchEvent', id);

        console.log(result);

        if (`${result}` !== '') {
            res.status(201).json({

                message: result,

            });
        }

    } catch (error) {
        res.status(400).json({

            message: "Erro",

        });
    }
});

// BARCODES

// Posting a new barcode
app.post("/barcode", async (req, res) => {

    const { id, barcode, batch, status } = req.body;

    try {

        const result = await contract.submitTransaction('CreateBarcode', id, barcode, batch, status);

        console.log(result);

        if (`${result}` !== '') {
            res.status(201).json({

                message: "Ok",

            });
        }

    } catch (error) {
        res.status(400).json({

            message: "Erro",

        });
    }

});

// Getting a specific barcode
app.get("/barcode/:id", async (req, res) => {

    const { id } = req.params;

    try {

        const result = await contract.evaluateTransaction('ReadBarcode', id);

        console.log(result);

        if (`${result}` !== '') {
            res.status(201).json({

                message: result,

            });
        }

    } catch (error) {
        res.status(400).json({

            message: "Erro",

        });
    }
});

// BARCODE EVENTS

// Posting a new barcode event
app.post("/barcode-event", async (req, res) => {

    const { id, barcode, barcode_event_type } = req.body;

    try {

        const result = await contract.submitTransaction('CreateBarcodeEvent', id, barcode, barcode_event_type);

        console.log(result);

        if (`${result}` !== '') {
            res.status(201).json({

                message: "Ok",

            });
        }

    } catch (error) {
        res.status(400).json({

            message: "Erro",

        });
    }

});

// Getting a specific barcode event
app.get("/barcode-event/:id", async (req, res) => {

    const { id } = req.params;

    try {

        const result = await contract.evaluateTransaction('ReadBarcodeEvent', id);

        console.log(result);

        if (`${result}` !== '') {
            res.status(201).json({

                message: result,

            });
        }

    } catch (error) {
        res.status(400).json({

            message: "Erro",

        });
    }
});

// BARCODE READINGS

// Posting a new barcode reading
app.post("/barcode-reading", async (req, res) => {

    const { id, barcode, latitude, longitude, user_identifier } = req.body;

    try {

        const result = await contract.submitTransaction('CreateBarcodeReading', id, barcode, latitude, longitude, user_identifier);

        console.log(result);

        if (`${result}` !== '') {
            res.status(201).json({

                message: "Ok",

            });
        }

    } catch (error) {
        res.status(400).json({

            message: "Erro",

        });
    }
});

// Getting a specific barcode reading
app.get("/barcode-reading/:id", async (req, res) => {

    const { id } = req.params;

    try {

        const result = await contract.evaluateTransaction('ReadBarcodeReading', id);

        console.log(result);

        if (`${result}` !== '') {
            res.status(201).json({

                message: result,

            });
        }

    } catch (error) {
        res.status(400).json({

            message: "Erro",

        });
    }
});

// PRODUCTS

// Posting a new barcode reading
app.post("/product", async (req, res) => {

    const { id, name, classification, company } = req.body;

    try {

        const result = await contract.submitTransaction('CreateProduct', id, name, classification, company);

        console.log(result);

        if (`${result}` !== '') {
            res.status(201).json({

                message: "Ok",

            });
        }

    } catch (error) {
        res.status(400).json({

            message: "Erro",

        });
    }
});

// Getting a specific barcode reading
app.get("/product/:id", async (req, res) => {

    const { id } = req.params;

    try {

        const result = await contract.evaluateTransaction('ReadProduct', id);

        console.log(result);

        if (`${result}` !== '') {
            res.status(201).json({

                message: result,

            });
        }

    } catch (error) {
        res.status(400).json({

            message: "Erro",

        });
    }
});

// Posting a new barcode reading
app.put("/product/:id", async (req, res) => {

    const {name, classification, company, product_reference} = req.body;

    const { id } = req.params;

    try {

        const result = await contract.evaluateTransaction('UpdateProduct', id, name, classification, company, product_reference);

        console.log(result);

        if (`${result}` !== '') {
            res.status(201).json({

                message: result,

            });
        }

    } catch (error) {
        res.status(400).json({

            message: "Erro",

        });
    }
});

app.listen(3000, async function () {
    try {
        // build an in memory object with the network configuration (also known as a connection profile)
		const ccp = buildCCPOrg1();

		// build an instance of the fabric ca services client based on
		// the information in the network configuration
		const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

		// setup the wallet to hold the credentials of the application user
		const wallet = await buildWallet(Wallets, walletPath);

		// in a real application this would be done on an administrative flow, and only once
		await enrollAdmin(caClient, wallet, mspOrg1);

		// in a real application this would be done only when a new user was required to be added
		// and would be part of an administrative flow
		await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

		// Create a new gateway instance for interacting with the fabric network.
		// In a real application this would be done as the backend server session is setup for
		// a user that has been verified.
		const gateway = new Gateway();

        // setup the gateway instance
        // The user will now be able to create connections to the fabric network and be able to
        // submit transactions and query. All transactions submitted by this gateway will be
        // signed by this user using the credentials stored in the wallet.
        await gateway.connect(ccp, {
            wallet,
            identity: org1UserId,
            discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
        });

        // Build a network instance based on the channel where the smart contract is deployed
        const network = await gateway.getNetwork(channelName);

        // Get the contract from the network.
        const contract = network.getContract(chaincodeName);

    } catch (error) {
        
    }
    console.log("Server started on port 3000");
});
