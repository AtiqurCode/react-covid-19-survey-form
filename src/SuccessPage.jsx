import { useLocation } from 'react-router-dom';
import { Button } from 'primereact/button';

const SuccessPage = () => {
    const location = useLocation();
    const message = location.state?.message || "Form submitted successfully!";

    return (
        <div
            className="privacy-policy surface-0 p-4 shadow-2 border-round mx-auto"
            style={{
                 
                padding: '2rem',
                maxWidth: '800px',
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <div>
                <h1>Submitted successfully.</h1>
                <p>{message}</p>
                <Button
                    label="Back to Home"
                    icon="pi pi-arrow-left"
                    onClick={() => (window.location.href = '/')}
                />
            </div>
        </div>
    );
};

export default SuccessPage;
