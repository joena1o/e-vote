import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { createElection } from '../../../Redux/electionSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object({
  name: Yup.string().required('Election name is required'),
  type: Yup.string().oneOf(['general', 'faculty', 'department'], 'Invalid election type').required('Election type is required'),
  date: Yup.date().required('Election date is required').nullable(),
  faculty: Yup.string().when('type', {
    is: 'faculty',
    then: Yup.string().required('Faculty name is required for faculty elections'),
  }),
  department: Yup.string().when('type', {
    is: 'department',
    then: Yup.string().required('Department name is required for department elections'),
  }),
});

const CreateElection = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
      type: '',
      date: null,
      faculty: '',
      department: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(createElection(values));
      toast.success('Election created successfully!');
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group"> {/* Apply styling to this class */}
        <label htmlFor="name">Election Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          className="form-control" {/* Apply styling to this class */}
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name ? <div>{formik.errors.name}</div> : null}
      </div>

      <div className="form-group"> {/* Apply styling to this class */}
        <label htmlFor="type">Election Type:</label>
        <select
          id="type"
          name="type"
          className="form-control" {/* Apply styling to this class */}
          onChange={formik.handleChange}
          value={formik.values.type}
        >
          <option value="" label="Select type" />
          <option value="general" label="General" />
          <option value="faculty" label="Faculty" />
          <option value="department" label="Department" />
        </select>
        {formik.errors.type ? <div>{formik.errors.type}</div> : null}
      </div>

      <div className="form-group"> {/* Apply styling to this class */}
        <label htmlFor="date">Election Date:</label>
        <input
          id="date"
          name="date"
          type="date"
          className="form-control" {/* Apply styling to this class */}
          onChange={formik.handleChange}
          value={formik.values.date ? formik.values.date : ''}
        />
        {formik.errors.date ? <div>{formik.errors.date}</div> : null}
      </div>

      {formik.values.type === 'faculty' && (
        <div className="form-group"> {/* Apply styling to this class */}
          <label htmlFor="faculty">Faculty Name:</label>
          <input
            id="faculty"
            name="faculty"
            type="text"
            className="form-control" {/* Apply styling to this class */}
            onChange={formik.handleChange}
            value={formik.values.faculty}
          />
          {formik.errors.faculty ? <div>{formik.errors.faculty}</div> : null}
        </div>
      )}

      {formik.values.type === 'department' && (
        <div className="form-group"> {/* Apply styling to this class */}
          <label htmlFor="department">Department Name:</label>
          <input
            id="department"
            name="department"
            type="text"
            className="form-control" {/* Apply styling to this class */}
            onChange={formik.handleChange}
            value={formik.values.department}
          />
          {formik.errors.department ? <div>{formik.errors.department}</div> : null}
        </div>
      )}

      <button type="submit" className="btn btn-primary">Create Election</button> {/* Apply styling to this class */}
    </form>
  );
};

export default CreateElection;
