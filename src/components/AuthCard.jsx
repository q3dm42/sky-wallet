function AuthCard({ title, children }) {
  return (
    <div className="auth-card">
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default AuthCard;
