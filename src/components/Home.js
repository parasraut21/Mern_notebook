import ADDNOTE from './ADDNOTE'
import Footer from './Footer';
import Notes from './Notes'


export const Home = (props) => {
const {mode,togglemode,showAlert}=props;
    return (
   <>
     <Notes  mode={mode} togglemode={togglemode} showAlert={showAlert}/>
     <Footer title="Designed by Paras Raut" mode={mode} togglemode={togglemode} fixed={""}/>
   </>
    )
}