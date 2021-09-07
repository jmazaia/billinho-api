async function basicAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: 'Nenhuma credencial foi enviada!' });
  }
  if (req.headers.authorization !== 'Basic YWRtaW5fb3BzOmJpbGxpbmc=') {
    return res.status(401).json({ error: 'Credenciais inválidas!' });
  }
  return next();
}
export default basicAuth;
