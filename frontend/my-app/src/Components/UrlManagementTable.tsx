import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Button, Chip } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

interface Data {
  id: string,
  name: string,
  shortUrl: string,
  original: string,
  clicks: number,
  timeCreated: string,
  expiration: string,
  status: string,
}

function createData(
  id: string,
  name: string,
  shortUrl: string,
  original: string,
  clicks: number,
  timeCreated: string,
  expiration: string,
  status: string,
): Data {
  return {
    id,
    name,
    shortUrl,
    original,
    clicks,
    timeCreated,
    expiration,
    status,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Title',
  },
  {
    id: 'shortUrl',
    numeric: false,
    disablePadding: false,
    label: 'Shortened Url',
  },
  {
    id: 'original',
    numeric: false,
    disablePadding: false,
    label: 'Original Url',
  },
  {
    id: 'clicks',
    numeric: true,
    disablePadding: false,
    label: 'Clicks',
  },
  {
    id: 'timeCreated',
    numeric: false,
    disablePadding: false,
    label: 'Created',
  },
  {
    id: 'expiration',
    numeric: false,
    disablePadding: false,
    label: 'Expiration',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left'
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  itemsSelected: readonly String[];
  setSelected: Function
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, itemsSelected, setSelected } = props;
  const handleDeleteClick = async () => {
    console.log('Deleting selected items:', itemsSelected);
    try {
      for (const id of itemsSelected) {
        const itemToDelete = globalThis.urlList.find((item: { id: String; }) => item.id === id);
        if (itemToDelete) {
          const deleteUrl = `${globalThis.url}/delete-url`; // Adjust this URL to your backend endpoint
          const response = await fetch(`${deleteUrl}?email=${encodeURIComponent(globalThis.userEmail)}&short_url=${encodeURIComponent(itemToDelete.shortUrl)}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            const errorMessage = await response.text();
            console.error('Failed to delete URL:', errorMessage);
            continue;
          }
          console.log(`URL with ID ${id} deleted successfully.`);
        }
      }
      globalThis.urlList = globalThis.urlList.filter((item: { id: String; }) => !itemsSelected.includes(item.id));
      setSelected([]);
    } catch (error) {
      console.error('Error during deletion:', error);
    }
  }


  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          URL Management
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete" onClick={handleDeleteClick}>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
export default function UrlManagementTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('clicks');
  const [selected, setSelected] = React.useState<String[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = globalThis.urlList.map((n: { id: string; }) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: any[] | ((prevState: String[]) => String[]) = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - globalThis.urlList.length) : 0;

  const navigate = useNavigate();

  function handleManageClick(): void {
    const newPath = `/dashboard/${userEmail}`;
    navigate(newPath);
  }

  const visibleRows = React.useMemo(
    () =>
      stableSort(globalThis.urlList, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} itemsSelected={selected} setSelected={setSelected} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={globalThis.urlList.length}
            />
            <TableBody>
              {globalThis.urlList.map((item: {
                status: string;
                clicks: number;
                expired: string;
                created: string;
                oriURL: string;
                shortURL: string;
                name: string;
                id: string;
              }, index: any) => {
                const isItemSelected = isSelected(item.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, item.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={item.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      style={{ width: 220 }}
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {item.name}
                    </TableCell>
                    <TableCell style={{ width: 300 }} align="left">{item.shortURL}</TableCell>
                    <TableCell align="left">{item.oriURL}</TableCell>
                    <TableCell style={{ width: 80 }} align="left">{item.clicks}</TableCell>
                    <TableCell style={{ width: 120 }} align="left">{item.created}</TableCell>
                    <TableCell style={{ width: 120 }} align="left">{item.expired}</TableCell>
                    <TableCell style={{ width: 60 }} align="left">
                      <Chip label={item.status} color={item.status === "Active" ? "success" : "error"} variant="outlined" />
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={globalThis.urlList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleManageClick}
          sx={{
            backgroundColor: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            borderRadius: '20px',
            '&:hover': {
              backgroundColor: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
            },
            padding: '10px 30px',
          }}
          endIcon={<ArrowForwardIosIcon />}
        >
          <Typography variant="button" component="span">
            Dashboard
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}
