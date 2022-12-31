export default function error(error: []) {
     return error.map((v: any) => {
          return {
               instancePath: v.instancePath,
               keyword: v.keyword,
               message: v.message
          }
     })
}