import withSession from "../../lib/session";

async function handler(req, res) {
  // get user from database then:
  const { username, password } = req.body
  
  const hasValidUsername = username === process.env.ADMIN_USERNAME
  const hasValidPassword = password === process.env.ADMIN_PASSWORD
  if(hasValidUsername && hasValidPassword){
      req.session.set("user", {
        username
      });
      await req.session.save();
      return res.json({
          isValid: true,
      });

  }
  else{
    return res.json({
        isValid: false,
        message: "Usuário e/ou senha incorretos"
    })
  }
}

export default withSession(handler);