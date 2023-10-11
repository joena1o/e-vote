import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import styled from 'styled-components';
import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Container = styled.div`
  display: flex;
  height: 80vh;
  justify-content: center;
  align-items: center;
  padding: 30px; 
  margin-top: 40px
`;

const FormSection = styled.div`
  flex: 1; 
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  height: 80vh;  
  width: 25%;   
  margin: 5% 0%;  // Adjusted horizontal margin to 0%
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, 
              rgba(0, 0, 0, 0.12) 0px -12px 30px, 
              rgba(0, 0, 0, 0.12) 0px 4px 6px, 
              rgba(0, 0, 0, 0.17) 0px 12px 13px, 
              rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const GradientSection = styled.div`
  flex: 1; 
  background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  height: 80vh;  
  width: 25%;   
  margin: 5% 0%;  // Adjusted horizontal margin to 0%
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, 
              rgba(0, 0, 0, 0.12) 0px -12px 30px, 
              rgba(0, 0, 0, 0.12) 0px 4px 6px, 
              rgba(0, 0, 0, 0.17) 0px 12px 13px, 
              rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;



const FormContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;  
  height: 80vh; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const StyledTitle = styled(Title)`
  font-size: 2px;  // Further reduced font size
  color: #333;
  margin-bottom: 10px;
`;


const SubText = styled.p`
  font-size: 12px;  // Reduced font size
  color: #555;
  margin-bottom: 10px;  // Adjusted margin
`;

const StyledInput = styled(Input)`
  width: 80%;
  margin: 0.5rem 0;
  border-radius: 4px;
  font-size: 14px;  // Adjusted font size
`;

const StyledButton = styled(Button)`
  width: 80%;  // Set to the same width as StyledInput
  background-color: #d8363a;
  border: none;
  color: white;
  font-size: 14px;  
  height: 30px;  // Adjusted to the same height as the input fields
  margin-top: 10px;  
  &:hover {
    background-color: #ee7724;
  }
`;
const StyledFormItem = styled(Form.Item)`
  button {
    width: 80% !important;  // Ensuring the width is 80% and overriding any other styles
  }
`;



// In GradientSection
const GradientTitle = styled.h4`
  font-size: 18px;  // Reduced font size
  margin-bottom: 10px;  // Adjusted margin
`;

const GradientText = styled.p`
  font-size: 12px;  // Reduced font size
  margin-bottom: 10px;  // Adjusted margin
`;




export default function EnhancedLogin() {
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
    <StyledFormItem>
      <StyledButton type="primary" htmlType="submit" block loading={loading}>
        Log in
      </StyledButton>
    </StyledFormItem>
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
          <GradientText>Electronic Voting Sytem</GradientText>
      </GradientSection>

    </Container>
  );
}
