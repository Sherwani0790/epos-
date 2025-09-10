import React from "react";
//Icons
import {
  BsCalendarMinus,
  BsCheckSquare,
  BsChevronDown,
  BsEnvelope,
  BsInputCursor,
  BsJustifyLeft,
  BsListCheck,
  BsPercent,
  BsPlus,
} from "react-icons/bs";
import { BiPhoneCall } from "react-icons/bi";
import { LuFormInput } from "react-icons/lu";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
//styles
import styles from "./globaldynamicfields.module.css";

const GlobalDynamicFieldsIndex = () => {
  return (
    <>
      <div className={styles.contact_dynamic_field_card}>
        {/* Header */}
        <div className={styles.contact_dynamic_field_card_header}>
          <div className={styles.customfields_header_alignment}>
            <div className={styles.customfields_header}>
              <h5>Add Custom Fields</h5>
              <p>
                Available Fields : <span>48</span>
              </p>
            </div>
            <div className={styles.customfields_plus_div}>
              <BsPlus className={styles.bs_plus_font} />
            </div>
          </div>
        </div>
        {/* Header */}

        {/* body */}

        <div className={styles.card_body}>
          <div className={styles.dynamic_fields_div}>
            <div className={styles.dynamic_input_fields}>
              <div className={styles.align_data}>
                <BsInputCursor />
                <span>Single Line</span>
              </div>
            </div>
            <div className={styles.dynamic_input_fields}>
              <div className={styles.align_data}>
                <BsJustifyLeft />
                <span>Multi Line</span>
              </div>
            </div>
          </div>

          <div className={styles.dynamic_fields_div}>
            <div className={styles.dynamic_input_fields}>
              <div className={styles.align_data}>
                <BsEnvelope />
                <span>Email</span>
              </div>
            </div>
            <div className={styles.dynamic_input_fields}>
              <div className={styles.align_data}>
                <BiPhoneCall />
                <span>Multi Line</span>
              </div>
            </div>
          </div>

          <div className={styles.dynamic_fields_div}>
            <div className={styles.dynamic_input_fields}>
              <div className={styles.align_data}>
                <BsChevronDown />
                <span>Single Selection</span>
              </div>
            </div>
            <div className={styles.dynamic_input_fields}>
              <div className={styles.align_data}>
                <BsListCheck />
                <span>Multi Selection</span>
              </div>
            </div>
          </div>

          <div className={styles.dynamic_fields_div}>
            <div className={styles.dynamic_input_fields}>
              <div className={styles.align_data}>
                <BsCalendarMinus />
                <span>Date</span>
              </div>
            </div>
            <div className={styles.dynamic_input_fields}>
              <div className={styles.align_data}>
                <LuFormInput />
                <span>Number</span>
              </div>
            </div>
          </div>

          <div className={styles.dynamic_fields_div}>
            <div className={styles.dynamic_input_fields}>
              <div className={styles.align_data}>
                <HiOutlineCurrencyDollar />
                <span>Date</span>
              </div>
            </div>
            <div className={styles.dynamic_input_fields}>
              <div className={styles.align_data}>
                <BsPercent />
                <span>Percentage</span>
              </div>
            </div>
          </div>

          <div className={styles.dynamic_fields_div}>
            <div className={styles.dynamic_input_fields}>
              <div className={styles.align_data}>
                <BsCheckSquare />
                <span>Date</span>
              </div>
            </div>
            <div className={styles.dynamic_input_fields}>
              <div className={styles.align_data}>
                <BsPercent />
                <span>Percentage</span>
              </div>
            </div>
          </div>
        </div>

        {/* body */}
      </div>
    </>
  );
};

export default GlobalDynamicFieldsIndex;
