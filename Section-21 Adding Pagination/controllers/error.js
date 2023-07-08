exports.get404 = (req, res, next) => {
  res
    .status(404)
    .render("404", {
      pageTitle: "Page Not Found",
      path: "/404",
      isAuthenticated: req.session.isLoggedIn,
    });
  // res.status(404).send(`<h1>Page Not Found!`);
  // res.status(404).sendFile(path.join(__dirname, 'Views', '404.html'));        //__dirname gives the absolute path for the current folder. Using commas we can concatenate the path upto the target file
};

exports.get500 = (req, res, next) => {
  res
    .status(500)
    .render("500", {
      pageTitle: "Error!",
      path: "/500",
      isAuthenticated: req.session.isLoggedIn,
    });
};
