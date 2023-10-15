import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import styled from 'styled-components';
import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5; /* Background color for the entire page */
`;

const FormContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 300px;
  text-align: center;
`;

const StyledTitle = styled(Title)`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const SubText = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 20px;
`;

const StyledInput = styled(Input)`
  margin-bottom: 15px;
`;

const StyledButton = styled(Button)`
  background: #1890ff;
  color: white;
  width: 100%;
  border: none;

  &:hover {
    background: #40a9ff;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const EnhancedLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const signIn = async () => {
    setLoading(true);
    try {
      await Auth.signIn(formData.username, formData.password);
      setError('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormContainer>
        <StyledTitle level={4}>Welcome Back</StyledTitle>
        <SubText>Please login to your account</SubText>
        <Form onFinish={signIn}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <StyledInput
              prefix={<UserOutlined />}
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <StyledInput
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <StyledButton type="primary" htmlType="submit" loading={loading}>
              Log in
            </StyledButton>
          </Form.Item>
        </Form>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormContainer>
    </Container>
  );
};

export default EnhancedLogin;
