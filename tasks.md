1. Create Auth:
    + expose API SIGNUP 
        Body : {
            email: STRING,
            password: STRING,
            repassword: STRING
        }

        Response :  {
            status: STRING (success | error),
            payload: {
                JWT_Token: STRING,
                expired: date,
                Email
            } | {
                message: STRING
            }
        }

    + expose API :/auth/login
        Body : {
            email: STRING,
            password: STRING
        }


2.Wallet API:
    + expose fetch all Wallet: /wallet
         Header: {
            Auth: JWT_token
        }

        Resonse : {
            status: STRING (success | error),
            payload : {
                wallets: [
                    {wallet_object}
                ]
            }
        }
    
    +expose create wallet API : /wallet/create
        Header: {
            Auth: JWT_token
        }
        
        Response : {
            status : STRING (success | error),
            payload: {
                wallet_address: STRING,
                wallet_id: INTEGER
                wallet_balance : FLOAT,
            }
        }

    +expose fetch wallet by id: /wallet/${id}
        Header: {
            Auth: JWT_token
        }

        Response : {
            status : STRING (success | error),
            payload: {
                wallet_address: STRING,
                wallet_id: INTEGER
                wallet_balance : FLOAT,
                transaction: [{transaction_object}]
            }
        }
    
    + expose fetch wall

    
