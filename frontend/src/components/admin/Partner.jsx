import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Alert
} from '@mui/material';
import { 
  Add as AddIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  PersonAdd as PersonAddIcon,
  Close as CloseIcon 
} from '@mui/icons-material';

const Partner = () => {
  const [partners, setPartners] = useState([]);
  const [newPartner, setNewPartner] = useState({ name: '', phone: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [partnerToDelete, setPartnerToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Fetch partners when component mounts
  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/admin/partners');
      setPartners(response.data);
      setSnackbar({ open: true, message: 'Partners loaded successfully', severity: 'success' });
    } catch (error) {
      console.error('Error fetching partners:', error);
      setSnackbar({ open: true, message: 'Failed to load partners', severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input changes for the new partner form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPartner(prev => ({ ...prev, [name]: value }));
  };

  // Handle deleting a partner
  const confirmDeletePartner = (partner) => {
    setPartnerToDelete(partner);
    setOpenDeleteDialog(true);
  };

  const handleDeletePartner = async () => {
    try {
      await axios.delete(`http://localhost:4000/admin/partners/${partnerToDelete._id}`);
      setPartners(partners.filter(partner => partner._id !== partnerToDelete._id));
      setSnackbar({ open: true, message: 'Partner deleted successfully', severity: 'success' });
    } catch (error) {
      console.error('Error deleting partner:', error);
      setSnackbar({ open: true, message: 'Failed to delete partner', severity: 'error' });
    } finally {
      setOpenDeleteDialog(false);
      setPartnerToDelete(null);
    }
  };

  // Handle adding a new partner
  const handleAddPartner = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:4000/admin/partners', newPartner);
      setNewPartner({ name: '', phone: '', email: '', password: '' });
      fetchPartners();
      setOpenAddDialog(false);
      setSnackbar({ open: true, message: 'Partner added successfully', severity: 'success' });
    } catch (error) {
      console.error('Error adding partner:', error);
      setSnackbar({ 
        open: true, 
        message: error.response?.data?.error || 'An error occurred while adding the partner', 
        severity: 'error' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  // Filter partners based on search term
  const filteredPartners = partners.filter(
    partner => 
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.phone.includes(searchTerm)
  );

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ py: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Partner Management
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="contained" 
              startIcon={<RefreshIcon />} 
              onClick={fetchPartners}
              disabled={isLoading}
            >
              Refresh
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddIcon />}
              onClick={() => setOpenAddDialog(true)}
            >
              Add Partner
            </Button>
          </Box>
        </Box>
        
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search partners by name, email, or phone..."
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'primary.light' }}>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Phone</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white', width: 120 }} align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPartners.length > 0 ? (
                    filteredPartners
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((partner) => (
                        <TableRow key={partner._id} hover>
                          <TableCell>{partner.name}</TableCell>
                          <TableCell>{partner.email}</TableCell>
                          <TableCell>{partner.phone}</TableCell>
                          <TableCell align="center">
                            <IconButton 
                              color="error" 
                              onClick={() => confirmDeletePartner(partner)}
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                        <Typography variant="body1" color="textSecondary">
                          {partners.length === 0 ? 'No partners found' : 'No partners match your search'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredPartners.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>

      {/* Add Partner Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="sm" fullWidth>
        <form onSubmit={handleAddPartner}>
          <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PersonAddIcon />
              <Typography variant="h6">Add New Partner</Typography>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ pt: 3, pb: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Partner Name"
                  name="name"
                  value={newPartner.name}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={newPartner.email}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  name="phone"
                  value={newPartner.phone}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={newPartner.password}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button 
              onClick={() => setOpenAddDialog(false)} 
              color="inherit"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={isSubmitting}
              startIcon={isSubmitting && <CircularProgress size={20} color="inherit" />}
            >
              {isSubmitting ? 'Adding...' : 'Add Partner'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle sx={{ color: 'error.main' }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {partnerToDelete?.name}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="inherit">Cancel</Button>
          <Button onClick={handleDeletePartner} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Partner;