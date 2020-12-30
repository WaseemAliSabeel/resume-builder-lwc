import { LightningElement, track } from 'lwc';


// Waseem's Example Template for JSON Resume initial load
import baseJSONResume from '../../../../resume.json';

export default class Resume extends LightningElement {
    @track boolShowModal = false;
    @track boolShowPicture = true;
    @track resume = baseJSONResume;
    @track strResume = JSON.stringify(this.resume, null, 4);
    @track backupResume = baseJSONResume;
    @track error;
    COMMA_SPACE = ', ';
    QUOTATION = '"';
    darkMode = false;
    boolisRendered = false;

    /***** Getter Method to render error if Bad Resume JSON *****/
    get boolisResumeEmpty() {
        return this.resume && this.resume.basics ? false : true;
    }
    /***** To Print the Resume without the slds-no-print Sections *****/
    handlePrint() {
        window.print();
    }

    /***** To Toggle Visibility of the Display Picture on the Resume*****/
    togglePicture() {
        this.boolShowPicture = !this.boolShowPicture;
    }

    renderedCallback() {
        if (!this.boolisRendered) {
            this.checkMode();
            this.boolisRendered = true;
        }
    }

    /***** To Show the Edit Resume Modal *****/
    showModal() {
        this.strResume = JSON.stringify(this.resume, null, 4);
        this.boolShowModal = true;
    }

    /***** To Close the Edit Resume Modal *****/
    closeModal() {
        this.boolShowModal = false;
        this.error = '';
        this.checkMode();
    }

    /***** To Reset the Resume JSON back to the original Static Template *****/
    resetJSON() {
        this.resume = baseJSONResume;
        this.strResume = JSON.stringify(this.resume, null, 4);
        this.closeModal();
    }
    /***** To Revert the Resume JSON back to previously saved content, in case of error *****/
    revertJSON() {
        this.strResume = JSON.stringify(this.backupResume, null, 4);
        this.closeModal();
    }

    /***** To store the user entered modifications as stringified JSON *****/
    handleJSONchange(event) {
        this.strResume = event.currentTarget.value;
    }

    /***** To parse the user-entered stringified JSON upon Update and reflect the changes on HTML *****/
    handleUpdateJSON() {
        try {
            this.error = '';
            this.resume = JSON.parse(this.strResume);
            this.backupResume = JSON.parse(this.strResume);
            this.closeModal();
        } catch (e) {
            this.error = 'Please Provide valid JSON structure.  ' + e;
        }
    }

    /***** To toggle between light mode and dark mode CSS *****/
    toggleMode() {
        this.darkMode = !this.darkMode;
        this.checkMode();
    }

    /***** To check and switch Full HTML styles between Dark mode and Light mode *****/
    checkMode() {
        if (!this.darkMode) {
            // Remove Dark Mode styles
            Array.from(this.template.querySelectorAll('.bg-inverse')).forEach(
                (ele) => {
                    ele.classList.add('bg-not-dark');
                    ele.classList.remove('bg-inverse');
                }
            );
            Array.from(
                this.template.querySelectorAll('.slds-text-color_inverse')
            ).forEach((ele) => {
                ele.classList.add('regular-text');
                ele.classList.remove('slds-text-color_inverse');
            });
            Array.from(
                this.template.querySelectorAll('.slds-text-color_inverse-weak')
            ).forEach((ele) => {
                ele.classList.add('weak-text');
                ele.classList.remove('slds-text-color_inverse-weak');
            });
            Array.from(this.template.querySelectorAll('.utility-icon')).forEach(
                (ele) => {
                    ele.variant = 'base';
                }
            );
        } else {
            // Enable Dark Mode Styles
            Array.from(this.template.querySelectorAll('.bg-not-dark')).forEach(
                (ele) => {
                    ele.classList.add('bg-inverse');
                    ele.classList.remove('bg-not-dark');
                }
            );
            Array.from(this.template.querySelectorAll('.regular-text')).forEach(
                (ele) => {
                    ele.classList.add('slds-text-color_inverse');
                    ele.classList.remove('regular-text');
                }
            );
            Array.from(this.template.querySelectorAll('.weak-text')).forEach(
                (ele) => {
                    ele.classList.add('slds-text-color_inverse-weak');
                    ele.classList.remove('weak-text');
                }
            );
            Array.from(this.template.querySelectorAll('.utility-icon')).forEach(
                (ele) => {
                    ele.variant = 'inverse';
                }
            );
        }
    }
}
