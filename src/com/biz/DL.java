package com.biz;

import java.util.Vector;

import com.pojo.Tuser;

public class DL {

	private DL() {
		this.useronline=new Vector<Tuser>();
	}
	
	private static DL d;
	
	public synchronized static DL getdl() {
		if(d==null) {
			d=new DL();
		}
		return d;
	}
	
	private Vector<Tuser> useronline;
	
	public synchronized Boolean chackuser(Tuser u) {
		Boolean b=false;
		for (Tuser tuser : useronline) {
			if (tuser.equals(u)) {
				b=true;
				break;
			}
		}
		
//		for (int i = 0; i < useronline.size(); i++) {
//			Tuser u1=useronline.get(i);
//			if (u1.equals(u)) {
//				b=true;
//				break;
//			}
//		}
		return b;
	}
	
	public synchronized void saveuser(Tuser u) {
		this.useronline.add(u);
	}
	
	
}
