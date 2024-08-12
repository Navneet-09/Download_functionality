const express = require('express');
const router = express.Router();
const db = require('../config/db-connection');
const ExcelJS = require('exceljs');

router.get('/', (req, res) => {
      res.send('Welcome user');
  });

router.get('/display', (req, res) => {
    db.query('SELECT * FROM employee', (error, results) => {
      if (error) return res.status(500).send(error);
  
      res.json(results);
    });
  });

router.put('/modify', (req, res) => {
    const { id, column, value } = req.body;
  
    const query = `UPDATE employee SET ${column} = ? WHERE id = ?`;
    db.query(query, [value, id], (error, results) => {
      if (error) return res.status(500).send(error);
  
      res.status(200).send('Record updated successfully');
    });
  });


  router.delete('/delete', (req, res) => {
    const { id } = req.body;
  
    const query = 'DELETE FROM employee WHERE id = ?';
    db.query(query, [id], (error, results) => {
      if (error) return res.status(500).send(error);
  
      res.status(200).send('Record deleted successfully');
    });
  });

  router.get('/download', async (req, res) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');
  
    db.query('SELECT * FROM employee', (error, results) => {
      if (error) throw error;
  
      worksheet.columns = Object.keys(results[0]).map(key => ({ header: key, key }));
      results.forEach(result => worksheet.addRow(result));
  
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');
  
      workbook.xlsx.write(res).then(() => {
        res.end();
      });
    });
  });

module.exports = router;
