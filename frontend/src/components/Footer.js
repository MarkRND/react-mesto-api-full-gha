function Footer() {
   const date =new Date().getFullYear()
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; {date} MarkusRnD</p>
    </footer>
  );
}

export default Footer;
