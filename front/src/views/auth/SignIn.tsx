import React from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zoyearzeplakofnlpwbl.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpveWVhcnplcGxha29mbmxwd2JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc2MDEyOTAsImV4cCI6MjAzMzE3NzI5MH0.jT-FjXdISIOixyVn2T-Gsd9B13UFGtz5I6YjLZLyoB8";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function SignIn() {
  const handleSignIn = async () => {
    await supabase.auth
      .signInWithPassword({
        email: "test@test.test",
        password: "test",
      })
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={styles.container}>
        <h2 style={styles.heading}>Sign In</h2>
        <form>
          <div style={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              style={styles.input}
            />
          </div>
          <button onClick={handleSignIn} style={styles.button}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    width: "300px",
  },
  heading: {
    marginBottom: "20px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default SignIn;
