import React, { useState } from 'react';

const MedicalRecords = () => {
  const [activeTab, setActiveTab] = useState('blood');
  const [expandedReport, setExpandedReport] = useState(null);

  const toggleReport = (id) => {
    setExpandedReport(expandedReport === id ? null : id);
  };

  // Sample medical reports data
  const bloodReports = [
    {
      id: 1,
      date: '2023-05-15',
      type: 'Complete Blood Count (CBC)',
      doctor: 'Dr. Sarah Johnson',
      summary: 'Routine checkup',
      details: {
        hemoglobin: '14.2 g/dL (Normal: 13.5-17.5)',
        hematocrit: '42.5% (Normal: 38.8-50.0)',
        wbc: '6.8 × 10³/μL (Normal: 4.5-11.0)',
        rbc: '4.7 × 10⁶/μL (Normal: 4.3-5.9)',
        platelets: '250 × 10³/μL (Normal: 150-450)',
        glucose: '98 mg/dL (Normal: 70-99)'
      },
      status: 'Normal'
    },
    {
      id: 2,
      date: '2023-03-10',
      type: 'Lipid Panel',
      doctor: 'Dr. Michael Chen',
      summary: 'Cholesterol screening',
      details: {
        totalCholesterol: '210 mg/dL (<200 desirable)',
        hdl: '45 mg/dL (>40 desirable)',
        ldl: '140 mg/dL (<100 optimal)',
        triglycerides: '125 mg/dL (<150 normal)'
      },
      status: 'Borderline High'
    }
  ];

  const imagingReports = [
    {
      id: 3,
      date: '2023-04-22',
      type: 'X-Ray',
      area: 'Chest',
      doctor: 'Dr. Emily Rodriguez',
      summary: 'Persistent cough evaluation',
      findings: 'No active pulmonary disease. Heart size normal. No pleural effusion or pneumothorax.',
      impression: 'No acute cardiopulmonary abnormality',
      status: 'Normal'
    },
    {
      id: 4,
      date: '2023-01-05',
      type: 'MRI',
      area: 'Brain',
      doctor: 'Dr. James Wilson',
      summary: 'Headache assessment',
      findings: 'No evidence of mass lesions or hemorrhage. Normal ventricular size. No restricted diffusion.',
      impression: 'Unremarkable brain MRI',
      status: 'Normal'
    }
  ];

  const otherReports = [
    {
      id: 5,
      date: '2023-06-18',
      type: 'Urinalysis',
      doctor: 'Dr. Lisa Park',
      summary: 'Annual physical exam',
      details: {
        color: 'Yellow (Normal)',
        appearance: 'Clear (Normal)',
        protein: 'Negative (Normal)',
        glucose: 'Negative (Normal)',
        ketones: 'Negative (Normal)',
        bilirubin: 'Negative (Normal)'
      },
      status: 'Normal'
    },
    {
      id: 6,
      date: '2023-02-28',
      type: 'ECG',
      doctor: 'Dr. Robert Kim',
      summary: 'Heart palpitations',
      findings: 'Normal sinus rhythm. Rate 72 bpm. PR interval 160 ms. QRS duration 88 ms. QT interval 380 ms. No ST-T changes.',
      impression: 'Normal ECG',
      status: 'Normal'
    }
  ];

  // Styles
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      backgroundColor: '#f5f7fa',
      minHeight: '100vh'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
      color: '#2c3e50'
    },
    tabs: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '30px',
      borderBottom: '1px solid #ddd'
    },
    tab: {
      padding: '12px 24px',
      margin: '0 10px',
      cursor: 'pointer',
      border: 'none',
      backgroundColor: 'transparent',
      fontSize: '16px',
      fontWeight: '600',
      color: '#7f8c8d',
      borderBottom: '3px solid transparent',
      transition: 'all 0.3s ease'
    },
    activeTab: {
      color: '#3498db',
      borderBottom: '3px solid #3498db'
    },
    reportsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))',
      gap: '20px'
    },
    reportCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      padding: '20px',
      transition: 'all 0.3s ease'
    },
    reportHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px',
      cursor: 'pointer'
    },
    reportTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#2c3e50',
      margin: '0'
    },
    reportDate: {
      color: '#7f8c8d',
      fontSize: '14px'
    },
    reportMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '15px',
      fontSize: '14px',
      color: '#7f8c8d'
    },
    status: (status) => ({
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      backgroundColor: status === 'Normal' ? '#e3fcef' : '#ffebee',
      color: status === 'Normal' ? '#00a76f' : '#ff5630'
    }),
    reportSummary: {
      color: '#34495e',
      marginBottom: '15px',
      lineHeight: '1.5'
    },
    reportDetails: {
      marginTop: '15px',
      borderTop: '1px solid #eee',
      paddingTop: '15px'
    },
    detailRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '8px',
      padding: '8px 0',
      borderBottom: '1px solid #f5f5f5'
    },
    detailLabel: {
      fontWeight: '600',
      color: '#2c3e50'
    },
    detailValue: {
      color: '#34495e'
    },
    findings: {
      marginBottom: '10px',
      lineHeight: '1.5'
    },
    impression: {
      fontStyle: 'italic',
      fontWeight: '600',
      color: '#2c3e50'
    },
    expandButton: {
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      marginTop: '10px'
    },
    noReports: {
      textAlign: 'center',
      color: '#7f8c8d',
      gridColumn: '1 / -1'
    }
  };

  const renderReportDetails = (report) => {
    if (report.details) {
      return (
        <div style={styles.reportDetails}>
          {Object.entries(report.details).map(([key, value]) => (
            <div key={key} style={styles.detailRow}>
              <span style={styles.detailLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
              <span style={styles.detailValue}>{value}</span>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div style={styles.reportDetails}>
          <div style={styles.findings}>
            <strong>Findings:</strong> {report.findings}
          </div>
          <div style={styles.impression}>
            <strong>Impression:</strong> {report.impression}
          </div>
        </div>
      );
    }
  };

  const renderReports = () => {
    let reports = [];
    switch (activeTab) {
      case 'blood':
        reports = bloodReports;
        break;
      case 'imaging':
        reports = imagingReports;
        break;
      case 'other':
        reports = otherReports;
        break;
      default:
        reports = [];
    }

    if (reports.length === 0) {
      return <div style={styles.noReports}>No reports found for this category</div>;
    }

    return reports.map((report) => (
      <div key={report.id} style={styles.reportCard}>
        <div 
          style={styles.reportHeader} 
          onClick={() => toggleReport(report.id)}
        >
          <h3 style={styles.reportTitle}>{report.type} {report.area ? `- ${report.area}` : ''}</h3>
          <span style={styles.reportDate}>{report.date}</span>
        </div>
        <div style={styles.reportMeta}>
          <span>Ordered by: {report.doctor}</span>
          <span style={styles.status(report.status)}>{report.status}</span>
        </div>
        <p style={styles.reportSummary}>{report.summary}</p>
        {expandedReport === report.id && renderReportDetails(report)}
        <button 
          style={styles.expandButton}
          onClick={() => toggleReport(report.id)}
        >
          {expandedReport === report.id ? 'Collapse Report' : 'View Full Report'}
        </button>
      </div>
    ));
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Medical Records</h1>
        <p>View and manage your medical test results and reports</p>
      </header>

      <div style={styles.tabs}>
        <button
          style={activeTab === 'blood' ? { ...styles.tab, ...styles.activeTab } : styles.tab}
          onClick={() => setActiveTab('blood')}
        >
          Blood Tests
        </button>
        <button
          style={activeTab === 'imaging' ? { ...styles.tab, ...styles.activeTab } : styles.tab}
          onClick={() => setActiveTab('imaging')}
        >
          Imaging Reports
        </button>
        <button
          style={activeTab === 'other' ? { ...styles.tab, ...styles.activeTab } : styles.tab}
          onClick={() => setActiveTab('other')}
        >
          Other Reports
        </button>
      </div>

      <div style={styles.reportsContainer}>
        {renderReports()}
      </div>
    </div>
  );
};

export default MedicalRecords;