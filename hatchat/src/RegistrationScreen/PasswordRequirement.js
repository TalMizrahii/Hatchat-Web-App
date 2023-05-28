import React from 'react';

function PasswordRequirement({ password }) {
    const requirements = [
        {
            label: 'At least 8 characters long.',
            regex: /^.{8,}$/,
        },
        {
            label: '1 uppercase letter A - Z.',
            regex: /^(?=.*[A-Z]).+$/,
        },
        {
            label: '1 lowercase letter a - z.',
            regex: /^(?=.*[a-z]).+$/,
        },
        {
            label: '1 number 0 - 9.',
            regex: /^(?=.*\d).+$/,
        },
        {
            label: '1 special character (!, @, #, $, etc.).',
            regex: /^(?=.*[@$!%*?&]).+$/,
        },
    ];

    const isValidRequirement = (requirement) => {
        return requirement.regex.test(password);
    };

    return (
        <div className="PasswordRequirement">
            <ul className="password-requirements">
                {requirements.map((requirement, index) => (
                    <li
                        key={index}
                        className={isValidRequirement(requirement) ? 'valid' : 'invalid-requirement'}
                    >
                        {requirement.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PasswordRequirement;