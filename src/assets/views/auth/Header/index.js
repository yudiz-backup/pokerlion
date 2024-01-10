import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader } from 'reactstrap';
import { TabContent, TabPane } from 'reactstrap'; // for message modal
import classnames from 'classnames';
import Select from 'react-select'
import logo from '../../../images/logo.svg';
import fb from '../../../images/facebook.svg';
import gmail from '../../../images/gmail.svg';
import messages from '../../../images/messages.svg';
import pokerChip from '../../../images/poker-chip.svg';
import refresh from '../../../images/header-refresh-icon.svg';
import wallet from '../../../images/wallet-icon.svg';
import plus from '../../../images/plus-icon.svg';
import user from '../../../images/user.jpg';
import logOut from '../../../images/log-out-icon.svg';
import OtpInput from 'react-otp-input';

function Header() {

    const [modal, setModal] = useState(false);

    const toggle2 = () => setModal(!modal);

    const [modal2, setModal2] = useState(false); // for message modal
    const toggle3 = () => setModal2(!modal2); // for message modal

    const [activeTab, setActiveTab] = useState('1'); // for message modal

    const toggle4 = tab => {
        if(activeTab !== tab) setActiveTab(tab); // for message modal
    }


    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const options = [
        { value: 'gujarat', label: 'Gujarat' },
        { value: 'maharashtra', label: 'Maharashtra' },
        { value: 'up', label: 'Uttar Pradesh' }
      ]

      const [otp, setOTP] = useState('')

      function handleChangeOtp(otp) {
        setOTP(otp)
    }

    return (
        <div>
            <header>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/"><img src={logo} alt="logo" /></NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar className="justify-content-end">
                        <Nav className="ml-auto align-items-center before-login d-none" navbar>
                            <NavItem>
                                <NavLink href="/components/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/components/">About</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/components/">Download App</NavLink>
                            </NavItem>
                            <NavItem className="dropdown-list">
                                <NavLink href="">How to Play</NavLink>
                                <ul>
                                    <li><NavLink href="https://www.rummy24.com/how-to-play-rummy"> How to play rummy</NavLink></li>
                                    <li><NavLink href="https://www.rummy24.com/rummy-rules">Rummy Rules</NavLink></li>
                                    <li><NavLink href="https://www.rummy24.com/cash-rummy-games">Cash Rummy</NavLink></li>
                                    <li><NavLink href="https://www.rummy24.com/rummy-tips-and-tricks"> Tips &amp; Tricks </NavLink></li>
                                    <li><NavLink href="https://www.rummy24.com/24x7-rummy-online"> 24x7 Rummy</NavLink></li>
                                    <li><NavLink href="https://www.rummy24.com/free-rummy-online">  Free Rummy</NavLink></li>
                                </ul>
                            </NavItem>
                            <NavItem className="dropdown-list">
                                <NavLink href="">Types of Rummy</NavLink>
                                <ul>
                                    <li><NavLink href="https://www.rummy24.com/indian-rummy">Indian Rummy</NavLink></li>
                                    <li><NavLink href="https://www.rummy24.com/13-cards-rummy">13 Cards Rummy</NavLink></li>
                                </ul>
                            </NavItem>
                            <NavItem className="dropdown-list">
                                <NavLink href="">About Rummy</NavLink>
                                <ul>
                                    <li><NavLink href="https://www.rummy24.com/rummy-glossary">Rummy Glossary</NavLink></li>
                                    <li><NavLink href="https://www.rummy24.com/history-of-rummy">Rummy History</NavLink></li>
                                    <li><NavLink href="https://www.rummy24.com/online-rummy-game">Online Rummy </NavLink></li>
                                    <li><NavLink href="https://www.rummy24.com/rummy-variations">Rummy Variations</NavLink></li>
                                </ul>
                            </NavItem>
                            <NavItem className="dropdown-list">
                                <NavLink href="">Offer</NavLink>
                                <ul>
                                    <li><NavLink href="https://www.rummy24.com/offer">Refer a Friend</NavLink></li>
                                    <li><NavLink href="https://www.rummy24.com/bonus-offer">Deposit Bonus</NavLink></li>
                                    <li><NavLink href="https://www.rummy24.com/ftd-offer">FTD Offer</NavLink></li>
                                    <li><NavLink href="https://www.rummy24.com/private-table">Private Table</NavLink></li>
                                    <li><NavLink href="https://www.rummy24.com/Super-100">Super 100</NavLink></li>
                                </ul>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/components/">Contact</NavLink>
                            </NavItem>
                            <NavItem>
                                <Button onClick={toggle2} className="play-now">Play Now</Button>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto align-items-center after-login " navbar>
                            <NavItem className="underline active">
                                <NavLink href="/">Lobby</NavLink>
                            </NavItem>
                            <NavItem className="underline">
                                <NavLink href="/my-account">My Account</NavLink>
                            </NavItem>
                            <NavItem className="underline">
                                <NavLink href="/offers">Offers</NavLink>
                            </NavItem>
                            <NavItem>
                                <Button color="danger" onClick={toggle3} className="p-0 bg-transparent border-0"><img src={messages} alt="messages" /></Button>
                                <span className="msg-badge"></span>
                            </NavItem>
                            <NavItem>
                                <div className="wallet-sec d-flex align-items-center">
                                        <img src={pokerChip} alt="poker-chip"/>
                                        <span>4990</span>
                                        <Link to="/"><div><img src={refresh} alt="refresh" /></div></Link>
                                </div>
                            </NavItem>
                            <NavItem>
                                <div className="wallet-sec d-flex align-items-center">
                                        <img src={wallet} alt="wallet"/>
                                        <span>100</span>
                                        <Link to="deposit-cash"><div><img src={plus} alt="plus" /></div></Link>
                                </div>
                            </NavItem>         
                            <NavItem className="d-flex align-items-center">
                                <div className="user-img" style={{backgroundImage: `url(${user})`}}></div>
                                <span className="user-name">Welcome, Aarav!</span>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/components/"><img src={logOut } alt="logOut " /></NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </header>
            <Modal isOpen={modal} toggle={toggle2} className="auth-modal">
                <div className="modal-cnt">
                    <ModalHeader className="p-0" toggle={toggle2}></ModalHeader>
                    {/* Register Detail */}
                    {/* <div className="register-dtl">
                        <div className="auth-dtl">
                            <div className="text-center">
                                <Link to="/"><img src={logo} alt="logo" /></Link>                                                
                                <h3 className="text-center">Register</h3>
                            </div>
                            <form>
                                <div className="form-group">
                                    <input type="email" placeholder="Email"/>
                                </div>
                                <div className="form-group pass-field">
                                    <input type="password" placeholder="Password (atleast 6 char)"/>
                                    <Link to="/" className="pass"></Link>
                                </div>
                                <div className="form-group">
                                    <div className="half-input d-flex">
                                        <div>
                                            <input type="text" placeholder="+91"/>
                                        </div>
                                        <div>
                                            <input type="text" placeholder="Mobile No"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group state-input d-flex justify-content-between">
                                    <div>
                                        <Select options={options} />
                                    </div>
                                    <div>
                                        <input type="text" placeholder="Pin Code"/>
                                    </div>
                                </div>
                                <div className="form-group referral-input pass-field">
                                    <input type="text" placeholder="Referral code"/>
                                    <Link to="/">Apply</Link>
                                </div>
                                <div className="form-group">
                                    <div className="radio-list cust-input-list d-flex">
                                        <p>Gender (Optional)</p> 
                                        <label for="radio" className="d-flex align-items-center">
                                            <div className="custom-radio">
                                                <input id="radio" type="radio" name="gen" checked/>
                                                <span></span>
                                            </div>
                                            Male
                                        </label>
                                        <label for="radio2" className="d-flex align-items-center">
                                            <div className="custom-radio">
                                                <input id="radio2" type="radio" name="gen"/>
                                                <span></span>
                                            </div>
                                            Female
                                        </label>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="common-btn yellow-btn">register</button>
                                </div>
                                <div className="d-flex justify-content-center align-items-center">
                                    <p>Existing User?</p><Link to="/" className="common-link auth-link">Login</Link>
                                </div>
                                <div className="text-center overflow-hidden">
                                    <div className="field-seprator">OR</div>
                                </div>
                                <div className="d-flex align-items-center justify-content-center">
                                    <ul className="p-0 social-list d-flex justify-content-center">
                                        <li><Link to="/"><img src={fb} alt="facebook" /></Link></li>
                                        <li><Link to="/"><img src={gmail} alt="gmail" /></Link></li>
                                    </ul>
                                </div>
                            </form>
                        </div>
                        <div className="text-center">
                            <p className="small-text">By registering you accept that you are 18+ and agree to our <Link to="/" className="common-link">Terms and Conditions</Link></p>
                            <p className="small-text">For any kind of queries, contact us on <Link to="mailto:support@rummy24.com" className="common-link">support@rummy24.com</Link></p>
                        </div>
                    </div> */}


                    {/* Login Detail */}
                    <div className="login-dtl">
                        <div className="auth-dtl">
                            <div className="text-center">
                                <Link to="/"><img src={logo} alt="logo" /></Link>                                                
                                <h3 className="text-center">Login</h3>
                            </div>
                            <form>
                                <div className="form-group">
                                    <div className="half-input d-flex">
                                        <div>
                                            <input type="text" placeholder="+91"/>
                                        </div>
                                        <div>
                                            <input type="text" placeholder="Mobile No"/>
                                            <p className="error-text">Enter Valid Mobile Number</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group pass-field">
                                    <input type="password" placeholder="Password"/>
                                    <Link to="/" className="pass"></Link>
                                </div>
                                <div className="form-group">
                                    <div className="cust-input-list d-flex justify-content-between align-items-center"> 
                                        <label for="chkbox" className="d-flex align-items-center">
                                            <div className="custom-checkbox">
                                                <input id="chkbox" type="checkbox"/>
                                                <span></span>
                                            </div>
                                            Remember Me
                                        </label>
                                        <Link to="/" className="common-link auth-link">Forgot Password?</Link>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="common-btn yellow-btn">Login</button>
                                </div>
                                <div className="d-flex justify-content-center align-items-center">
                                    <p>New User?</p><Link to="/" className="common-link auth-link">Register Now</Link>
                                </div>
                                <div className="text-center overflow-hidden">
                                    <div className="field-seprator">OR</div>
                                </div>
                                <div className="text-center">
                                    <p>REGISTER WITH</p>
                                    <ul className="p-0 social-list d-flex justify-content-center">
                                        <li><Link to="/" target="_blank"><img src={fb} alt="facebook" /></Link></li>
                                        <li><Link to="/" target="_blank"><img src={gmail} alt="gmail" /></Link></li>
                                    </ul>
                                </div>
                            </form>
                        </div>
                        <div className="text-center">
                            <p className="small-text">By registering you accept that you are 18+ and agree to our <Link to="/" className="common-link">Terms and Conditions</Link></p>
                            <p className="small-text">For any kind of queries, contact us on <Link to="mailto:support@rummy24.com" className="common-link">support@rummy24.com</Link></p>
                        </div>
                    </div>



                    {/* Forgot password detail */}
                    {/* <div className="forgot-psw-dtl">
                        <div className="auth-dtl">
                            <div className="text-center">
                                <Link to="/"><img src={logo} alt="logo" /></Link>                                                
                                <h3 className="text-center">Forgot Password</h3>
                            </div>
                            <p className="reset-desc text-center">Please enter your registered Email or Mobile Number to Reset your Password.</p>
                            <form>
                                <div className="form-group">
                                    <input type="text" placeholder="Email or Mobile No"/>
                                </div>                            
                                <div className="text-center">
                                    <button type="submit" className="common-btn yellow-btn">SUBMIT</button>
                                </div>
                            </form>
                            <div className="d-flex justify-content-center align-items-center">
                                <p>Go back to</p><Link to="/" className="common-link auth-link">Login</Link>
                            </div>
                        </div>
                    </div> */}

                    {/* OTP Screen */}
                    {/* <div className="forgot-psw-dtl otp-dtl">
                        <div className="auth-dtl">
                            <div className="text-center">
                                <Link to="/"><img src={logo} alt="logo" /></Link>
                                <h3 className="text-center">Verification</h3>
                            </div>
                            <p className="reset-desc text-center">Enter the OTP we just sent you</p>
                            <form>
                                <div className="d-flex justify-content-center">
                                    <div className="otp-inputs">
                                        <OtpInput
                                            inputStyle="inputStyle"
                                            value={otp}
                                            onChange={handleChangeOtp}
                                            numInputs={4}
                                            separator={<span>-</span>}
                                        />
                                        <div className="d-flex justify-content-between align-items-center resend-otp">
                                            <Link to="/" className="common-link auth-link m-0">Resend OTP?</Link>
                                            <span className="d-block">00:59</span>
                                        </div>
                                        <div className="form-group pass-field">
                                            <input type="password" placeholder="Password (atleast 6 char)"/>
                                            <Link to="/" className="pass"></Link>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="common-btn mb-0 yellow-btn">SUBMIT</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div> */}
                </div>
            </Modal>

            {/* Message modal */}
            <Modal isOpen={modal2} toggle={toggle3} className="msg-modal bg-white modal-with-header">
                <div className="modal-cnt">
                    <ModalHeader toggle={toggle3}>Message Center</ModalHeader>
                    <div className="message-tabs d-flex">
                        <Nav tabs>
                            <NavItem>
                                <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle4('1'); }}>
                                    Freeroll Tournament
                                    <p className="small-text">7/9/2021</p>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle4('2'); }}>
                                    Invest MINIMUM, Earn MAXIMUM!
                                    <p className="small-text">2/7/2021</p>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={classnames({ active: activeTab === '3' })} onClick={() => { toggle4('3'); }}>
                                    Rummy Tournament
                                    <p className="small-text">16/5/2021</p>
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                                <h6>Freeroll Tournament</h6>
                                <p>Hello, Tournament Lovers!! Prices slashed down on Buy-in fee. Join our tournament and GET great discounts on the Buy-in fee. So what are you waiting for? Book your seats now.</p>
                            </TabPane>
                            <TabPane tabId="2">
                                <h6>Invest MINIMUM, Earn MAXIMUM!</h6>
                                <p>Hello, Tournament Lovers!! Prices slashed down on Buy-in fee. Join our tournament and GET great discounts on the Buy-in fee. So what are you waiting for? Book your seats now.</p>
                            </TabPane>
                            <TabPane tabId="3">
                                <h6>Rummy Tournament</h6>
                                <p>Hello, Tournament Lovers!! Prices slashed down on Buy-in fee. Join our tournament and GET great discounts on the Buy-in fee. So what are you waiting for? Book your seats now.</p>
                            </TabPane>
                        </TabContent>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Header;
