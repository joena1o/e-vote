import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import styled from 'styled-components';
import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 60vh;
  justify-content: center;
  align-items: flex-start;
  padding: 15px;
  padding-top: 50px;
  width: 60%;
  margin: auto;

  @media (max-width: 768px) {
    width: 90%;  // Adjusted width for mobile screens
  }
`;

const Section = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
  height: 100%;
  width: 100%;
`;

const FormSection = styled(Section)`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
`;

const GradientSection = styled(Section)`
  background: linear-gradient(to right, #ce7348, #9a552e);
  color: white;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
`;


const FormContainer = styled.div`

  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const StyledTitle = styled(Title)`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
`;

const SubText = styled.p`
  font-size: 12px;
  color: #555;
  margin-bottom: 10px;
`;

const StyledInput = styled(Input)`
  width: 80% !important;
  margin: 0.5rem 0;
  border-radius: 4px;
  font-size: 14px;
`;

const StyledButton = styled(Button)`
  width: 80% !important;
  background: linear-gradient(to right, #ce7348, #9a552e);
  border: none;
  color: white;
  font-size: 14px;
  height: 30px;
  margin-top: 10px;
`;


const GradientTitle = styled.h4`
  font-size: 18px;
  margin-bottom: 10px;
`;

const GradientText = styled.p`
  font-size: 12px;
  margin-bottom: 10px;
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
      <FormSection>
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
              <StyledButton type="primary" htmlType="submit" block loading={loading}>
                Log in
              </StyledButton>
            </Form.Item>
          </Form>
          {error && (
            <div style={{ color: 'red', marginTop: '10px' }}>
              {error}
            </div>
          )}
        </FormContainer>
      </FormSection>
      <GradientSection>
        <GradientTitle>Moddibbo Adama University</GradientTitle>
        <GradientText>Electronic Voting System</GradientText>
      </GradientSection>
    </Container>
  );
};

export default EnhancedLogin;
