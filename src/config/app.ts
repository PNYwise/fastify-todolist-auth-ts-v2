import dotenv from "dotenv";
dotenv.config()
export default {

     /**
      * application port
      */
     appPort: process.env.APP_PORT || 3000,

     /**
      * application url
      */
     appUrl: process.env.APP_URL,

     /**
      * application name default fastify
      */
     appName: process.env.APP_NAME || "fastify",

     /**
      * application name default secret key
      */
     appSecret: process.env.APP_SECRET || "b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86"
}