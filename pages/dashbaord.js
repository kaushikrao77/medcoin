import * as cookie from "cookie";
import styles from "../styles/Dashboard.module.css";
import { signIn, signOut, useSession } from "next-auth/client";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import { useState } from "react";

export default function Dashboard() {
  const [session, loading] = useSession();
  const [open, setOpen] = useState(false);

  return (
    <main className={styles.main}>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={styles.modalPaperCont}>
          <Paper>
            <form className={styles.form}>
              <h2> Fill the details of your document.</h2>
              <TextField
                id="outlined-basic"
                label="Document Name"
                variant="outlined"
                className={styles.textInput}
              />
              <Button variant="contained" component="label">
                Upload File
                <input type="file" hidden />
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={styles.submitButton}
              >
                Submit
              </Button>
            </form>
          </Paper>
        </div>
      </Modal>
      <h1 className={styles.title}>
        Welcome <a href="https://nextjs.org">{session?.user?.name}!</a>
      </h1>
      <p className={styles.description}>These are your medical documents</p>
      <Button color="primary" variant="contained" onClick={() => setOpen(true)}>
        Upload Documents
      </Button>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Documentation &rarr;</h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </div>

        <div className={styles.card}>
          <h2>Learn &rarr;</h2>
          <p>Learn about Next.js in an interactive course with quizzes!</p>
        </div>

        <div className={styles.card}>
          <h2>Examples &rarr;</h2>
          <p>Discover and deploy boilerplate example Next.js projects.</p>
        </div>

        <div className={styles.card}>
          <h2>Deploy &rarr;</h2>
          <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  let cookies = cookie.parse(context.req.headers.cookie);
  if (cookies.doctor == "true") {
    context.res.statusCode = 302;
    context.res.setHeader("Location", `/doctor/dashbaord`);
  }
  return { props: {} };
}
