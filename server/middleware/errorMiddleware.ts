module.exports = (err: any, req: any, res: any, next: any) => {
  console.error(err.message);
  res.status(500).json({ success: false, msg: err.message });
};
