module.exports.getCurrentUser = (req: any, res: any) => {
  res.json({ success: true, data: req.decoded.name });
};
