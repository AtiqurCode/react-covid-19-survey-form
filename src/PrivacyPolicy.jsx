import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const PrivacyPolicy = () => {
    const header = (
        <h1 style={{ marginBottom: '1rem' }}>Privacy Policy</h1>
    );

    return (
        <div className="privacy-policy surface-0 p-4 shadow-2 border-round mx-auto" style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
            <div>
                {header}
                <p>
                    This privacy policy explains how we collect, use, and protect your data when gathering information on symptoms experienced after receiving a COVID-19 vaccine.
                </p>

                <h2>1. Data Collection</h2>
                <p>
                    We collect information on symptoms experienced post-vaccination, including but not limited to:
                </p>
                <ul>
                    <li>Fever</li>
                    <li>Fatigue</li>
                    <li>Headache</li>
                    <li>Pain at the injection site</li>
                </ul>
                <p>All data will be anonymized and will not include any personally identifiable information.</p>

                <h2>2. Purpose of Data Collection</h2>
                <p>
                    The data collected will be used to analyze common symptoms experienced post-COVID-19 vaccination and help improve healthcare services and public awareness.
                </p>

                <h2>3. Data Protection</h2>
                <p>
                    We take your data privacy seriously and implement robust security measures to protect your information from unauthorized access or misuse.
                </p>

                <h2>4. Consent</h2>
                <p>
                    By submitting your symptoms, you consent to the collection and use of your data as outlined in this privacy policy.
                </p>

                <h2>5. Contact Information</h2>
                <p>
                    If you have any questions about this privacy policy, please contact us at <strong>2021200010018@seu.edu.bd, 2021200010007@seu.edu.bd, 2021200010011@seu.edu.bd</strong>.
                </p>

                <Button
                    label="Back to Home"
                    icon="pi pi-arrow-left"
                    onClick={() => window.location.href = '/'}
                />
            </div>
        </div>
    );
};

export default PrivacyPolicy;
