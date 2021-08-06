import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const [session, loading] = useSession();
  const classes = useStyles();
  return (
    <div className={styles.Navbar}>
      <AppBar position="static">
        <Toolbar className={classes.flxify}>
          {/* <IconButton 
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <div className={styles.flexify}>
            <Typography variant="h5" className={classes.title}>
              Medcoin
            </Typography>
            <Link href="/login">
              {session ? (
                <div onClick={() => signOut()}>
                  <Button color="inherit">Sign Out</Button>
                </div>
              ) : (
                <Button color="inherit">Sign In</Button>
              )}
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
