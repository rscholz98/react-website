import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";

// Import page components
import Start from "./1_Start";
import DataLoading from "./2_DataLoading";
import OpenOffers from "./3_OpenOffers";
import OrderOverview from "./4_OrderOveriew";
import Reports from "./5_Reports";
import Office from "./6_Office";
import Production from "./7_Production";
import DataManagement from "./8_DataManagement";
import Copyright from "./Layout/Copyright";

// Importing icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import BarChartIcon from "@mui/icons-material/BarChart";
import StorageIcon from "@mui/icons-material/Storage";

const drawerWidth = 240;

// Tab data with icons
const tabs_primary = [
  { name: "Start", Icon: DashboardIcon },
  { name: "Data Loading", Icon: CreateNewFolderIcon },
  { name: "Open Offers", Icon: FolderCopyIcon },
  { name: "Order Overview", Icon: AssignmentIcon },
  { name: "Reports", Icon: BarChartIcon },
];

const tabs_second = [
  { name: "Office", Icon: ApartmentIcon },
  { name: "Production", Icon: PrecisionManufacturingIcon },
];

const tabs_third = [{ name: "Data Management", Icon: StorageIcon }];

export default function ClippedDrawer() {
  const [selectedPage, setSelectedPage] = React.useState("Dashboard");
  const isSelected = (name) => name === selectedPage;

  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  const renderPage = () => {
    switch (selectedPage) {
      case "Start":
        return <Start />;
      case "Data Loading":
        return <DataLoading />;
      case "Open Offers":
        return <OpenOffers />;
      case "Order Overview":
        return <OrderOverview />;
      case "Reports":
        return <Reports />;
      case "Office":
        return <Office />;
      case "Production":
        return <Production />;
      case "Data Management":
        return <DataManagement />;
      default:
        return <Start />;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid
              item
              xs={4}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
              }}
            ></Grid>
            <Grid item xs={4}>
              <Typography
                component="h1"
                variant="h4"
                noWrap
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Test Application
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "right",
              }}
            ></Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {tabs_primary.map(({ name, Icon }) => (
              <ListItem key={name} disablePadding>
                <ListItemButton
                  onClick={() => handlePageChange(name)}
                  sx={isSelected(name) ? { backgroundColor: "#F2F2F2" } : null}
                >
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />

          <List>
            {tabs_second.map(({ name, Icon }) => (
              <ListItem key={name} disablePadding>
                <ListItemButton
                  onClick={() => handlePageChange(name)}
                  sx={isSelected(name) ? { backgroundColor: "#F2F2F2" } : null}
                >
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />

          <List>
            {tabs_third.map(({ name, Icon }) => (
              <ListItem key={name} disablePadding>
                <ListItemButton
                  onClick={() => handlePageChange(name)}
                  sx={isSelected(name) ? { backgroundColor: "#F2F2F2" } : null}
                >
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Toolbar />
        {renderPage()}
        <Copyright
          title={"Richard Scholz"}
          link={"https://github.com/rscholz98/react-website"}
          sx={{
            paddingTop: 10,
            paddingBottom: 1,
          }}
        />
      </Box>
    </Box>
  );
}
